import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'npt-simple-gauge',
  templateUrl: './simple-gauge.component.html',
  styleUrls: ['./simple-gauge.component.scss']
})
export class SimpleGaugeComponent implements OnInit {

  chart = new Chart({
    chart: {
      type: 'solidgauge',
      height: '150px',
      backgroundColor: 'transparent',
    },

    title: {
      text: '',
    },

    labels: {
      items: [
        {
          html: '72° | 86°',
          style: {
            top: '60px',
            left: '115px'
          }
        }
      ],
      style: {
        color: '#ffffff',
        fontSize: '24px'
      }
    },
    pane: {
      startAngle: -120,
      endAngle: 120,
      background: [{
        backgroundColor: 'transparent',
        borderWidth: 0
      }]
    },

    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false
        },
        linecap: 'round',
        stickyTracking: false,
        rounded: true
      }
    },

    series: [{
      name: 'Outdoor',
      data: [{
        color: '#4caf50',
        radius: '112%',
        innerRadius: '88%',
        y: 72
      }]
    }, {
      name: 'Indoor',
      data: [{
        color: '#03a9f4',
        radius: '87%',
        innerRadius: '63%',
        y: 65
      }]
    }],
    credits: {
      enabled: false
    }
  } as any);

  constructor() { }

  ngOnInit() {
  }

}

// #7cb5ec blue
// #434348 grey
// #90ed7d green