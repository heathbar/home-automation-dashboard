import { CameraComponent } from './camera/camera.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicComponent } from './music/music.component';
import { AppShellComponent } from './app-shell/app-shell.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '', component: AppShellComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'music', component: MusicComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'cameras', component: CameraComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class V1RoutingModule { }
