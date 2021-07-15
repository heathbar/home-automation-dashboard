import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './home/home.component';
import { MusicComponent } from './music/music.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as solidGauge from 'highcharts/modules/solid-gauge.src';
import { SimpleGaugeComponent } from './simple-gauge/simple-gauge.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { CameraComponent } from './camera/camera.component';
import { ForecastComponent } from './forecast/forecast.component';
import { CommonModule } from '@angular/common';
import { V1RoutingModule } from './v1-routing.module';
import { AppShellComponent } from './app-shell/app-shell.component';

@NgModule({
  declarations: [
    HomeComponent,
    MusicComponent,
    CalendarComponent,
    SimpleGaugeComponent,
    LineChartComponent,
    CameraComponent,
    ForecastComponent,
    AppShellComponent
  ],
  imports: [
    CommonModule,
    V1RoutingModule,
    ChartModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [more, solidGauge] }],

})
export class V1Module { }
