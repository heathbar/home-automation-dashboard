import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import { OnChange } from 'src/app/v1/services/on-change.decorator';


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
  @Input() private colors = ['#12d066', '#d32dac', '#1381f8'];

  chart = new Chart({
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      height: '140px'
    },
    colors: this.colors,
    title: {
      text: ''
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.1,
        marker: {
          enabled: false
        }
      }
    },
    series: [{}, {}],
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
      tickColor: '#0e112166',
      lineColor: '#0e112166',
      gridLineColor: '#0e112166',
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
      gridLineColor: '#0e112166'
    },
    credits: {
      enabled: false
    }
  } as any);


  @Input()
  @OnChange(function (data) { this.updateData(data); })
  private data: Array<Array<Array<number>>> = [];

  constructor() {
  }

  ngOnInit() {
    (this.chart as any).options.yAxis.labels.format = `{value}${this.unit}`;
  }


  public updateData(data) {
    if (data) {
      data.forEach(dataSet => {
        this.chart.removeSeries(0);
        this.chart.addSeries({ data: dataSet } as any, true, true);
      });
    }
  }

}
