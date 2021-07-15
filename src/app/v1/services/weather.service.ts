import { HomeAssistantService } from './home-assistant.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import { Forecast } from '../../forecast.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private homeAssistantService: HomeAssistantService) { }

  get outdoorTemperature$(): Observable<number> {
    return this.homeAssistantService.events$.pipe(
      filter(e => e['sensor.dark_sky_temperature']),
      map(e => Math.round(e['sensor.dark_sky_temperature'].state)),
      distinctUntilChanged()
    );
  }

  get outdoorHumidity$(): Observable<number> {
    return this.homeAssistantService.events$.pipe(
      filter(e => e['sensor.dark_sky_humidity']),
      map(e => Math.round(e['sensor.dark_sky_humidity'].state)),
      distinctUntilChanged()
    );
  }

  get hourlySummary$(): Observable<string> {
    return this.homeAssistantService.events$.pipe(
      filter(e => e['sensor.dark_sky_hourly_summary']),
      map(e => e['sensor.dark_sky_hourly_summary'].state),
      distinctUntilChanged()
    );
  }

  get dailySummary$(): Observable<string> {
    return this.homeAssistantService.events$.pipe(
      filter(e => e['sensor.dark_sky_daily_summary']),
      map(e => e['sensor.dark_sky_daily_summary'].state),
      distinctUntilChanged()
    );
  }

  get forecast$(): Observable<Forecast[]> {
    return this.homeAssistantService.events$.pipe(
      filter(e => e['sensor.dark_sky_daytime_high_temperature_0d']),
      map(event => {
        const forecast = [];
        for (let i = 0; i < 5; i++) {
          forecast.push({
            dayName: moment(new Date()).add(i, 'days').format('ddd'),
            highTemp: Math.round(event[`sensor.dark_sky_daytime_high_temperature_${i}d`].state),
            lowTemp: Math.round(event[`sensor.dark_sky_overnight_low_temperature_${i}d`].state),
            icon: this.weatherIcon(event[`sensor.dark_sky_icon_${i}d`].state)
          });
        }
        return forecast;
      }),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  private weatherIcon(name: string): string {
    switch (name) {
      case 'clear-day':
        return '/assets/Sun.svg';
      case 'clear-night':
        return '/assets/Moon.svg';
      case 'rain':
        return '/assets/Cloud-Rain.svg';
      case 'snow':
        return '/assets/Cloud-Snow.svg';
      case 'sleet':
        return '/assets/Cloud-Hail.svg';
      case 'wind':
        return '/assets/Cloud-Wind.svg';
      case 'fog':
        return '/assets/Cloud-Fog.svg';
      case 'cloudy':
        return '/assets/Cloud.svg';
      case 'partly-cloudy-day':
        return '/assets/Cloud-Sun.svg';
      case 'partly-cloudy-night':
        return '/assets/Cloud-Moon.svg';
      default:
        return '/assets/Sun.svg';
    }
  }
}
