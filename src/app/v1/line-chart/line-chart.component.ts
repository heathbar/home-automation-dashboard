import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import { OnChange } from '../services/on-change.decorator';

moment.locale('en', {
  meridiem: (hours, minutes, isLower) => {
    if (hours > 11) {
      return isLower ? 'p' : 'P';
    } else {
      return isLower ? 'a' : 'A';
    }
  }
} as any);


@Component({
  selector: 'npt-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() private unit: string;

  chart = new Chart({
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      height: '125px'
    },
    title: {
      text: ''
    },
    plotOptions: {
      line: {
        color: '#ffffffCC'
      }
    },
    series: [{}],
    legend: {
      enabled: false
    },
    xAxis: {
      title: '',
      type: 'datetime',
      labels: {
        style: {
          color: '#ffffffCC'
        },
        formatter() {
          return moment(new Date(this.value)).format('ha');
        }
      },
      tickColor: '#ffffff33',
      lineColor: '#ffffff33',
      gridLineColor: '#ffffff11',
      gridLineWidth: 2,
      tickInterval: 3600 * 1000
    },
    yAxis: {
      title: '',
      labels: {
        style: {
          color: '#ffffffCC'
        },
        format: `{value}`
      },
      gridLineColor: '#ffffff33'
    },
    credits: {
      enabled: false
    }
  } as any);


  @Input()
  @OnChange(function(data) { this.updateData(data); })
  private data: Array<Array<number>> = [];

  constructor() {
  }

  ngOnInit() {
    (this.chart as any).options.yAxis.labels.format = `{value}${this.unit}`;
  }


  public updateData(data) {
    if (data) {
      this.chart.removeSeries(0);
      this.chart.addSeries({ data } as any, true, true);
    }
  }

}
