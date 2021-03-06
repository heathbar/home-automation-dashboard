import { CalendarService } from '../services/calendar.service';
import { WeatherService } from '../services/weather.service';
import { DashboardService } from '../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { pluck, throttleTime, map, tap,  } from 'rxjs/operators';
import { EnergyService } from '../services/energy.service';
import { timeSeries } from '../services/time-series.operator';
import * as moment from 'moment';

@Component({
  selector: 'npt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private energyService: EnergyService,
    private weatherService: WeatherService,
    private calendarService: CalendarService) { }

  outdoorTemperature$ = this.weatherService.outdoorTemperature$;
  outdoorHumidity$ = this.weatherService.outdoorHumidity$;
  outdoorTemperatureGraph$ = this.outdoorTemperature$.pipe(
    throttleTime(5 * 60 * 1000),
    timeSeries('outdoor-temperature', 24)
  );
  hourlySummary$ = this.weatherService.hourlySummary$;

  forecast$ = this.weatherService.forecast$;
  dailySummary$ = this.weatherService.dailySummary$;

  currentPowerUsage$ = this.energyService.currentPowerUsage$;
  powerGraphData$ = this.currentPowerUsage$.pipe(
    throttleTime(10 * 60 * 1000),
    timeSeries('power-graph-data', 24)
  );
  dailyEnergyUsage$ = this.energyService.dailyEnergyUsage$;
  monthlyEnergyUsage$ = this.energyService.monthlyEnergyUsage$;

  indoorTemperature$ = this.dashboardService.indoorTemperature$;
  thermostatMode$ = this.dashboardService.thermostatMode$;
  thermostatStatusText$ = this.dashboardService.thermostatStatusText$;
  thermostatStatusIcon$ = this.dashboardService.thermostatStatusIcon$;
  thermostatStatusAnimation$ = this.dashboardService.thermostatStatusAnimation$;
  hvacBlower$ = this.dashboardService.hvacBlower$;

  garageDoor$ = this.dashboardService.garageDoor$.pipe(
    map(state => this.capitalizeFirstCharacter(state))
  );
  garageDoorLastChangeDate$ = this.dashboardService.garageDoor$.pipe(
    map(value => {
      const previous = JSON.parse(localStorage.getItem('garage-door'));
      if (previous && previous.state === value) {
        return previous.date;
      } else {
        const date = moment(new Date()).calendar().toLowerCase();
        localStorage.setItem('garage-door', JSON.stringify({ state: value, date }));
        return date;
      }
    })
  );

  drivewayLights$ = this.dashboardService.drivewayLights$;

  mediaArtist$ = this.dashboardService.media$.pipe(pluck('artist'));
  mediaTitle$ = this.dashboardService.media$.pipe(pluck('title'));
  mediaPlayer$ = this.dashboardService.media$.pipe(pluck('player'));

  sprinkler$ = this.dashboardService.sprinkler$;
  camera1$ = this.dashboardService.camera1$;
  camera2$ = this.dashboardService.camera2$;

  today$ = this.calendarService.today$;
  appointments$ = this.calendarService.appointments$.pipe(
    map(appts => appts.slice(0, 5))
  );
  apptColumns = ['day-color', 'day', 'time', 'title'];

  ngOnInit() {
  }

  private capitalizeFirstCharacter(str: string) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }
}
