import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatChipsModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { MusicComponent } from './music/music.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as solidGauge from 'highcharts/modules/solid-gauge.src';
import { SimpleGaugeComponent } from './simple-gauge/simple-gauge.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { CameraComponent } from './camera/camera.component';
import { HttpClientModule } from '@angular/common/http';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MusicComponent,
    CalendarComponent,
    SimpleGaugeComponent,
    LineChartComponent,
    CameraComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule
  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [ more, solidGauge ] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
