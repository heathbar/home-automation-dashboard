import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'npt-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.appService.page$.subscribe((page: string) => {
      this.router.navigate(['v1', page.toLowerCase()]);
    });

    interval(1000 * 60 * 60 * 4).subscribe(() => {
      location.reload();
    });
  }

}
