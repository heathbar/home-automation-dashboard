import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'npt-run-script',
  templateUrl: './run-script.component.html',
  styleUrls: ['./run-script.component.scss']
})
export class RunScriptComponent implements OnInit {

  @Input() name: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
