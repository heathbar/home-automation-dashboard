import { Component, OnInit } from '@angular/core';
import { map, throttleTime } from 'rxjs/operators';
import { timeSeries } from 'src/app/v1/services/time-series.operator';
import { WeatherService } from 'src/app/v1/services/weather.service';

@Component({
  selector: 'npt-power-usage',
  templateUrl: './power-usage.component.html',
  styleUrls: ['./power-usage.component.scss']
})
export class PowerUsageComponent implements OnInit {

  outdoorTemperatureGraph$ = this.weatherService.outdoorTemperature$.pipe(
    throttleTime(5 * 60 * 1000),
    timeSeries('outdoor-temperature', 24),
    map(data => [data])
  );

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
