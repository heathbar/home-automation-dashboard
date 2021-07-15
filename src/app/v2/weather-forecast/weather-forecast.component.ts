import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'npt-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  days = [
    {
      label: 'Wednesday',
      icon: 'cloud',
      high: 72,
      low: 65
    },
    {
      label: 'Thursday',
      icon: 'cloud',
      high: 72,
      low: 65
    },
    {
      label: 'Friday',
      icon: 'wb_sunny',
      high: 78,
      low: 72
    },
    {
      label: 'Saturday',
      icon: 'wb_sunny',
      high: 72,
      low: 65
    },
    {
      label: 'Sunday',
      icon: 'cloud',
      high: 72,
      low: 65
    }
  ];
  constructor() { }

  ngOnInit(): void {

  }

  isYellow(icon: string) {
    switch(icon) {
      case 'wb_sunny':
        return true;
      default:
          return false;
    }
  }

  isBlue(icon: string) {
    switch (icon) {
      case 'wb_sunny':
        return false;
      default:
        return true;
    }
  }
}
