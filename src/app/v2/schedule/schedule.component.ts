import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'npt-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  apptColumns = ['day-color', 'day', 'time', 'title'];
  appointments$ = of([
    {
      day: 'Wed',
      time: '1:00pm',
      title: 'Park Program'
    },
    {
      day: 'Wed',
      time: '6:00pm',
      title: 'Hannah\'s night'
    },
    {
      day: 'Thu',
      time: '1:00pm',
      title: 'Park Program'
    },
    {
      day: 'Thu',
      time: '6:00pm',
      title: 'Band Practice'
    },
    {
      day: 'Fri',
      time: '9:00pm',
      title: 'Movie night with friends who are great'
    },
    {
      day: 'Sat',
      time: '1:00pm',
      title: 'Nap Time'
    },
    {
      day: 'Sat',
      time: '6:00pm',
      title: 'Supper'
    },
    {
      day: 'Sat',
      time: '11:00pm',
      title: 'Bed Time'
    }
  ]);

  constructor() { }

  ngOnInit(): void {
  }

}
