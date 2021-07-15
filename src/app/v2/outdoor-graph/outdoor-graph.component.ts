import { Component, OnInit } from '@angular/core';
import { map, throttleTime } from 'rxjs/operators';
import { timeSeries } from 'src/app/v1/services/time-series.operator';
import { WeatherService } from 'src/app/v1/services/weather.service';

@Component({
  selector: 'npt-outdoor-graph',
  templateUrl: './outdoor-graph.component.html',
  styleUrls: ['./outdoor-graph.component.scss']
})
export class OutdoorGraphComponent implements OnInit {

  outdoorTemperatureGraph$ = this.weatherService.outdoorTemperature$.pipe(
    throttleTime(5 * 60 * 1000),
    timeSeries('outdoor-temperature', 24),
    map(data => {
      let i = 0;
      const data2 = data.map(([time, value]) => [time, value - 40 + (i += 1)]);
      return [data, data2];
    })
  );

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
