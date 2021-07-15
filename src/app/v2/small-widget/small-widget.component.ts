import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'npt-small-widget',
  templateUrl: './small-widget.component.html',
  styleUrls: ['./small-widget.component.scss']
})
export class SmallWidgetComponent implements OnInit {

  @Input() data: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
