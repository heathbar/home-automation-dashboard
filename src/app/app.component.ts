import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'npt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.page$.subscribe((page: string) => {
      this.router.navigate([page.toLowerCase()]);
    });
  }
}
