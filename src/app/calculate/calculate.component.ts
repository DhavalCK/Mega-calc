import { Component, OnInit } from '@angular/core';
import { RouteConfig } from '../shared/enums/route-config.enum';
import { FeatureTitle } from '../shared/enums/feature-title.enum';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {
  title: any = 'calc';

  routeConfig: any = RouteConfig as Object;
  featureTitle: any = FeatureTitle as Object;

  constructor() {
    this.title = this.getTitleByRoute();
  }

  ngOnInit() {
    // let path = mainUrl.slice(mainUrl.indexOf('calculate/'));
    // KeyByRoute[path];
    // console.log(KeyByRoute)
    // console.log('key',key);
  }

  getTitleByRoute(): string {
    let mainUrl = window.location.href;

    for (const key in this.routeConfig) {
      // let value = RouteConfig[key] as any;
      if (mainUrl.includes(this.routeConfig[key])) {
        return this.featureTitle[key];
      }
    }
    return 'Calculation';
  }
}
