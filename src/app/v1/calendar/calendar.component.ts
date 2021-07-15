import { CalendarService } from '../services/calendar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'npt-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  constructor(private calendarService: CalendarService) { }

  today$ = this.calendarService.today$;
  appointments$ = this.calendarService.appointments$;
  apptColumns = ['day-color', 'day', 'time', 'title'];

}
