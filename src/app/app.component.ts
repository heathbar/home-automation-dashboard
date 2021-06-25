import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

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

    interval(1000 * 60 * 60 * 4).subscribe(() => {
      location.reload();
    });
  }
}
