import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'npt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  indoor = {
    icon: 'thermostat',
    color: '#1486f8',
    label: 'Indoor Temperature',
    value: '77°'
  };

  outdoorTemp = {
    icon: 'thermostat',
    color: '#6e61e4',
    label: 'Outdoor Temperature',
    value: '85°'
  };

  sprinkler = {
    icon: 'local_florist',
    color: '#12d066',
    label: 'Sprinkler',
    value: 'Today',
    subtext: 'The program ran as scheduled'
  };

  garage = {
    icon: 'drive_eta',
    color: '#1486f8',
    label: 'Garage Door',
    value: 'Closed',
    subtext: 'Closed since 5:40pm'
  };


  constructor() { }

  ngOnInit(): void {

    localStorage.setItem('outdoor-temperature', JSON.stringify({ history: [[1626240365367, 71], [1626243965345, 70], [1626249792482, 69], [1626252365395, 67], [1626255365392, 66], [1626257765386, 65], [1626264193436, 66], [1626264965466, 67], [1626266165567, 68], [1626267365442, 69], [1626267965438, 70], [1626269165539, 71], [1626270365630, 72], [1626270965430, 74], [1626315945011, 51]] }));
  }

}
