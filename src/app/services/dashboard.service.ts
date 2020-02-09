import { HttpClient } from '@angular/common/http';
import { HomeAssistantService } from './home-assistant.service';
import { Injectable } from '@angular/core';
import { map, distinctUntilChanged, distinctUntilKeyChanged, filter, withLatestFrom, startWith, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { Observable, interval, of } from 'rxjs';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private sprinklerPassword;

  constructor(private homeAssistantService: HomeAssistantService, private http: HttpClient) {
    this.sprinklerPassword = localStorage.getItem('sprinkler-password');
    if (!this.sprinklerPassword || this.sprinklerPassword === 'null') {
      this.sprinklerPassword = prompt('Sprinkler Password');
      localStorage.setItem('sprinkler-password', this.sprinklerPassword);
    }
  }

  get thermostat$(): Observable<any> {
    return this.homeAssistantService.events$.pipe(
      map(e => e['climate.thermostat']),
    );
  }

  get indoorTemperature$(): Observable<number> {
    return this.thermostat$.pipe(
      map(t => t.attributes.current_temperature),
      distinctUntilChanged()
    );
  }

  get thermostatMode$(): Observable<string> {
    return this.thermostat$.pipe(
      map(t => t.attributes.operation_mode),
      distinctUntilChanged()
    );
  }

  get thermostatStatus$(): Observable<string> {
    return this.thermostat$.pipe(
      map(t => {
        const system = (t.state === 'idle') ? 'idle' : `${t.state}ing`;

        return `System: ${system}, Fan: ${t.attributes.fan}`;
      }),
      distinctUntilChanged()
    );
  }

  get garageDoor$(): Observable<string> {
    return this.homeAssistantService.events$.pipe(
      map(e => e['sensor.garage_door'].state),
      distinctUntilChanged(),
    );
  }

  get drivewayLights$(): Observable<boolean> {
    return this.homeAssistantService.events$.pipe(
      map(e => e['light.driveway'].state === 'on' || e['switch.garage'].state === 'on'),
      distinctUntilChanged()
    );
  }

  get media$(): Observable<any> {
    return this.homeAssistantService.events$.pipe(
      map(entities => {
        const mainLevelWithDeck = entities['media_player.chromecast_main_level_with_deck'];
        const mainLevel = entities['media_player.chromecast_main_level'];
        const familyRoom = entities['media_player.jbl_link5008599'];
        const kitchen = entities['media_player.chromecast_kitchen_assistant'];
        const officeSpeaker = entities['media_player.chromecast_office_speaker'];
        const roku = entities['media_player.roku_yn00hk386825'];

        if (mainLevelWithDeck && mainLevelWithDeck.state === 'playing') {
          return {
            player: 'Main Level with Deck',
            artist: mainLevelWithDeck.attributes.media_artist,
            title: mainLevelWithDeck.attributes.media_title,
            thumb: HomeAssistantService.host + mainLevel.attributes.entity_picture
          };
        } else if (mainLevel && mainLevel.state === 'playing') {
          return {
            player: 'Main Level',
            artist: mainLevel.attributes.media_artist,
            title: mainLevel.attributes.media_title,
            thumb: HomeAssistantService.host + mainLevel.attributes.entity_picture
          };
        } else if (familyRoom && familyRoom.state === 'playing') {
          return {
            player: 'Family Room Speaker',
            artist: familyRoom.attributes.media_artist,
            title: familyRoom.attributes.media_title,
            thumb: HomeAssistantService.host + familyRoom.attributes.entity_picture
          };
        } else if (kitchen && kitchen.state === 'playing') {
          return {
            player: 'Kitchen Speaker',
            artist: kitchen.attributes.media_artist,
            title: kitchen.attributes.media_title,
            thumb: HomeAssistantService.host + kitchen.attributes.entity_picture
          };
        } else if (officeSpeaker && officeSpeaker.state === 'playing') {
          return {
            player: 'Heath\'s Office Speaker',
            artist: officeSpeaker.attributes.media_artist,
            title: officeSpeaker.attributes.media_title,
            thumb: HomeAssistantService.host + officeSpeaker.attributes.entity_picture
          };
        } else if (roku && (roku.state === 'playing' || roku.state === 'paused')) {
          return {
            player: roku.attributes.friendly_name,
            artist: roku.attributes.friendly_name,
            title: roku.attributes.app_name
          };
        } else {
          return {
            player: '',
            artist: '',
            title: ''
          };
        }
      }),
      distinctUntilKeyChanged('title'),
      filter(e => e.title !== undefined)
    );
  }

  get sprinkler$(): Observable<any> {

    // API: https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/5097673481/original/os-api_2.1.8.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJ2JSYZ7O3I4JO6DA%2F20190703%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T031040Z&X-Amz-Expires=300&X-Amz-Signature=2aa0444fbe6d4fe31d0b62212e41245485a64d4e2fe0cdd33a72506e114ac63a&X-Amz-SignedHeaders=Host&response-content-type=application%2Fpdf

    const host = environment.sprinklerHost;
    const pw = `?pw=${this.sprinklerPassword}`;

    return interval(5000).pipe(
      startWith(null),
      switchMapTo(this.http.get(`${host}/js${pw}`)),
      switchMap((response: any) => {

        // Check if any stations are running right now
        for (let i = 0; i < response.sn.length; i++) {
          if (response.sn[i] === 1) {

            // Lookup name of currently running station
            return this.http.get(`${host}/jn${pw}`).pipe(
              map((stations: any) => ({
                label: 'Sprinkler Running',
                value: stations.snames[i],
                subtext: ''
              })));
          }
        }

        // Since no stations are running, lookup last run time
        return this.http.get(`${host}/jl${pw}&hist=365`).pipe(
          map((log: any[][]) => {
            let rainDelayMessage;

            // Loop backwards through the events looking for the most recent rain and/or water event
            for (let i = log.length - 1; i >= 0; i--) {
              const [programId, stationId, duration, endTime] = log[i];

              if (programId === 0 && (stationId === 'rs' || stationId === 'rd') && !rainDelayMessage) {
                rainDelayMessage = `Rain delay until ${moment(endTime * 1000).format('dddd h:mma')}`;
              } else if (programId !== 0) {
                const defaultSubtext = programId > 50 ? 'The program was initiated manually' : 'The program ran as scheduled';
                const subtext = rainDelayMessage ? rainDelayMessage : defaultSubtext;

                return {
                  label: 'Sprinkler Last Ran',
                  value: moment(endTime * 1000).add(5, 'hours').calendar(null, {
                    sameDay: '[Today]',
                    lastDay: '[Yesterday]',
                    lastWeek: 'dddd',
                    sameElse: 'MMMM Qo'
                  }),
                  subtext
                };
              }
            }
          })
        );
      })
    );
  }

  get camera1$(): Observable<string> {
    return this.homeAssistantService.events$.pipe(
      map(e => `${HomeAssistantService.host}${e['camera.boys_camera'].attributes.entity_picture.replace('camera_proxy', 'camera_proxy_stream')}`),
      distinctUntilChanged()
    );
  }
  get camera2$(): Observable<string> {
    return this.homeAssistantService.events$.pipe(
      map(e => `${HomeAssistantService.host}${e['camera.play_room'].attributes.entity_picture.replace('camera_proxy', 'camera_proxy_stream')}`),
      distinctUntilChanged()
    );
  }
}
