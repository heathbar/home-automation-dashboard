import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { getAuth, createConnection, subscribeEntities } from 'home-assistant-js-websocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeAssistantService {

  public static host = environment.homeAssistantHost;
  private entities: Subject<any>;
  private events: Subject<any>;
  public events$: Observable<any>;

  constructor() {
    this.entities = new Subject();
    this.events = new Subject();
    this.events$ = this.entities.pipe(shareReplay(1));
    this.connect();
  }

  get enabled$(): Observable<boolean> {
    return this.events$.pipe(
      filter(e => e['switch.dashboard']),
      map(e => e['switch.dashboard'].state === 'on'),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  private async connect() {
    let auth;
    try {
      const config = { hassUrl: HomeAssistantService.host, saveTokens: this.saveTokens.bind(this), loadTokens: this.loadTokens.bind(this) };
      auth = await getAuth(config);
    } catch (err) {
      alert(`Unknown error ${err}`);
      return;
    }

    const connection = await createConnection({ auth });
    subscribeEntities(connection, entities => this.entities.next(entities));
    connection.subscribeEvents(e => this.events.next(e), 'state_changed');
  }

  private saveTokens(tokens) {
    sessionStorage.setItem('hass-token', JSON.stringify(tokens));
  }

  private loadTokens(tokens) {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(sessionStorage.getItem('hass-token')));
      } catch (err) {
        reject();
      }
    });
  }
}
