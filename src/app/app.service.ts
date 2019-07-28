import { HomeAssistantService } from './services/home-assistant.service';
import { Injectable } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private homeAssistantService: HomeAssistantService) { }

  get page$() {
    return this.homeAssistantService.events$.pipe(
      map(e => e['input_select.neptune_page'].state),
      distinctUntilChanged()
    );
  }
}
