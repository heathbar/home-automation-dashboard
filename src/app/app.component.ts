import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'npt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // interval(1000 * 60 * 60 * 4).subscribe(() => {
    //   location.reload();
    // });
  }
}
