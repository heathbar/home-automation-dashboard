import { HomeAssistantService } from './home-assistant.service';
import { Injectable } from '@angular/core';
import { map, distinctUntilChanged, scan, startWith, filter, throttleTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  private historical;

  constructor(private homeAssistantService: HomeAssistantService) {
    try {
      this.historical = JSON.parse(sessionStorage.getItem('power-graph-data')).historical;
    } catch (err) {
      this.historical = [];
    }
  }

  get currentPowerUsage$(): Observable<number> {
    return this.homeAssistantService.events$.pipe(
      map(e => parseInt(e['sensor.energy_usage'].state, 10)),
      distinctUntilChanged()
    );
  }

  get dailyEnergyUsage$(): Observable<number> {
    return this.homeAssistantService.events$.pipe(
      map(e => e['sensor.daily_usage'].state),
      distinctUntilChanged()
    );
  }

  get monthlyEnergyUsage$(): Observable<number> {
    return this.homeAssistantService.events$.pipe(
      map(e => e['sensor.monthly_usage'].state),
      distinctUntilChanged()
    );
  }
}
