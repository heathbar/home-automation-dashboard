import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SmallWidgetComponent } from './small-widget/small-widget.component';
import { V2RoutingModule } from './v2-routing.module';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { MatIconModule } from '@angular/material/icon';
import { WeatherTodayComponent } from './weather-today/weather-today.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { WeatherCurrentConditionsComponent } from './weather-current-conditions/weather-current-conditions.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MatTableModule } from '@angular/material/table';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartModule } from 'angular-highcharts';
import { OutdoorGraphComponent } from './outdoor-graph/outdoor-graph.component';
import { MusicComponent } from './music/music.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LightSwitchComponent } from './light-switch/light-switch.component';
import { CameraComponent } from './camera/camera.component';
import { PowerUsageComponent } from './power-usage/power-usage.component';
import { ThermostatComponent } from './thermostat/thermostat.component';
import { RunScriptComponent } from './run-script/run-script.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SmallWidgetComponent,
    HeaderComponent,
    WeatherForecastComponent,
    WeatherTodayComponent,
    WeatherWidgetComponent,
    WeatherCurrentConditionsComponent,
    ScheduleComponent,
    LineChartComponent,
    OutdoorGraphComponent,
    MusicComponent,
    LightSwitchComponent,
    CameraComponent,
    PowerUsageComponent,
    ThermostatComponent,
    RunScriptComponent
  ],
  imports: [
    CommonModule,
    V2RoutingModule,
    FlexLayoutModule,
    ChartModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSliderModule
  ]
})
export class V2Module { }
