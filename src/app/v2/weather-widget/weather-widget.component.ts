import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'npt-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {

  background = '';

  backgrounds = [
    'city/day/1.jpg',
    'city/day/2.jpg',
    'city/day/3.jpg',
    'city/day/4.jpg',
    'city/evening/1.jpg',
    'city/evening/2.jpg',
    'city/evening/3.jpg',
    'city/evening/4.jpg',
    'city/evening/5.jpg',
    'city/evening/6.jpg',
    'city/evening/7.jpg',
    'city/evening/8.jpg',
    'city/evening/9.jpg',
    'city/morning/1.jpg',
    'city/morning/2.jpg',
    'city/morning/3.jpg',
    'city/morning/4.jpg',
    'city/morning/5.jpg',
    'city/morning/6.jpg',
    'city/night/1.jpg',
    'city/night/2.jpg',
    'city/night/3.jpg',
    'city/night/4.jpg',
  ];

  constructor() { }

  ngOnInit(): void {
    const min = 0;
    const max = 22;
    const index = Math.floor(Math.random() * (max - min) + min);
    this.background = `../../assets/${this.backgrounds[index]}`;
  }

}
