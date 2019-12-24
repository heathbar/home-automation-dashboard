import { Injectable } from '@angular/core';
import { Observable, Subject, of, interval, BehaviorSubject } from 'rxjs';

import * as moment from 'moment';
import { switchMap, delay, switchMapTo, startWith, map, share, shareReplay, tap, publish } from 'rxjs/operators';

declare var gapi;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private clientId;
  private scopes = ['https://www.googleapis.com/auth/calendar.readonly'];
  private calendarId;
  private isAuthenticated = false;


  // This can't be a function because that makes the shareReplay() operator pointless
  appointments$ = interval(60 * 60  * 1000).pipe(
    startWith(0),
    switchMapTo(this.loadAppointments()),
    shareReplay()
  );

  constructor() {
    gapi.load('client:auth2');

    this.clientId = localStorage.getItem('gcal-clientId');
    if (!this.clientId || this.clientId === 'null') {
      this.clientId = prompt('Google Calendar Client ID');
      localStorage.setItem('gcal-clientId', this.clientId);
    }
    this.calendarId = localStorage.getItem('gcal-calendarId');
    if (!this.calendarId || this.calendarId === 'null') {
      this.calendarId = prompt('Google Calendar Calendar ID');
      localStorage.setItem('gcal-calendarId', this.calendarId);
    }
  }

  get today$(): Observable<string> {
    return interval(60 * 1000).pipe(
      startWith(0),
      map(() => moment().format('dddd, MMMM Do'))
    );
  }

  loadAppointments(): Observable<string[]> {
    if (!this.isAuthenticated) {
      return of({}).pipe(
        delay(2000),
        switchMap(() => this.login()),
        switchMap(() => this.loadAppts())
      );
    } else {
      return this.loadAppts();
    }
  }

  private loadAppts(): Observable<string[]> {
    const subject = new Subject<string[]>();
    const request = gapi.client.calendar.events.list({
      calendarId: this.calendarId,
      timeMin: moment().startOf('day').toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 16,
      orderBy: 'startTime'
    });

    request.execute((resp) => {
      const appointments = [];
      const events = resp.items;

      if (events.length > 0) {
        const colors = ['blue', 'green', 'red'];
        let prevDay = null;
        let prevIndex = -1;

        events.forEach(event => {
          const startDay = moment(event.start.dateTime || event.start.date);
          const endDay = moment(event.end.dateTime || event.end.date);

          if (!prevDay || prevDay !== startDay.format('ddd')) {
            prevDay = startDay.format('ddd');
            prevIndex++;
          }

          const dayDisplay = (startDay.format('ddd') !== endDay.format('ddd')) ? `${startDay.format('ddd')}-${endDay.format('ddd')}` : startDay.format('ddd')

          const time = event.start.date ? 'All-Day' : startDay.format('h:mma');
          appointments.push({ dayColor: colors[prevIndex % 3], day: dayDisplay, time, title: event.summary});
        });
      } else {
        appointments.push('No upcoming events found.');
      }
      subject.next(appointments);
    });

    return subject.asObservable();
  }

  private login(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => this.authenticate(false, resolve, reject), 1000);
    }).then(this.initializeGoogleCalendarAPI);
  }

  private authenticate(immediate: boolean, resolve: Function, reject: Function) {
    const authorisationRequestData = {
      client_id: this.clientId,
      scope: this.scopes,
      immediate
    };
    gapi.auth.authorize(authorisationRequestData,
      (authenticationResult) => {
        if (authenticationResult && !authenticationResult.error) {
          this.isAuthenticated = true;
          resolve(true);
        } else {
          this.isAuthenticated = false;
          reject();
        }
      }
    );
  }

  private initializeGoogleCalendarAPI(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(gapi.client.load('calendar', 'v3'));
    });
  }
}
