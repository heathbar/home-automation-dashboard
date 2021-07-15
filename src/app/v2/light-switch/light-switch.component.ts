import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'npt-light-switch',
  templateUrl: './light-switch.component.html',
  styleUrls: ['./light-switch.component.scss']
})
export class LightSwitchComponent implements OnInit {

  @Input() name: string;
  @Input() state = true;

  constructor() { }

  ngOnInit(): void {
  }

}
