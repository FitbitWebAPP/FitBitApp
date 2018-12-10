import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-other-users-data',
  templateUrl: './other-users-data.component.html',
  styleUrls: ['./other-users-data.component.css']
})
export class OtherUsersDataComponent implements OnInit {
  
  activityData;
  profile;
  errorMessage;
  chartData;
  
  view: any[] = [300, 600];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Steps';
  showYAxisLabel = true;
  yAxisLabel = 'Steps';
  colorScheme = {
    domain: ['#A10A28']
  };

  constructor(private _fitbit: ApiService, private _http: HttpClient) { }

  ngOnInit() {
  this._fitbit.getFitbitData().subscribe(data => { this.activityData = data as IFitbitResponse,error => this.errorMessage = <any>error});
  setTimeout(() => {
  this.chartData = [
    {
      "name": "steps",
      "value": this.activityData.summary.steps
    }
  ]
}, 1000); 
  }

}
