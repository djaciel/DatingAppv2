import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../_services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signalr-example',
  templateUrl: './signalr-example.component.html',
  styleUrls: ['./signalr-example.component.css']
})
export class SignalrExampleComponent implements OnInit {

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string;
  public chartLegend: boolean;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' },
    { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }];
  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
    this.chartType = 'bar';
    this.chartLegend = true;
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.signalRService.addBroadcastChartDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('http://localhost:5000/api/chart')
      .subscribe(res => {
        console.log(res);
      });
  }

  public chartClicked = (event) => {
    console.log(event);
    this.signalRService.broadcastChartData();
  }
}
