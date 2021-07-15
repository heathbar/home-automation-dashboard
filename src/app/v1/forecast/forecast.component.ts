import { Forecast } from '../../forecast.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'npt-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  @Input() forecast: Forecast[] = [];
}
