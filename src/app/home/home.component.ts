import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConfig } from '../shared/enums/route-config.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title: string = 'Mega Calculator'

  featureList: any = [
    {
      id: 1,
      title: 'Age',
      imgUrl: 'age-crop.jpg',
      route: RouteConfig.AGE,
      order: 1
    }
  ];

  constructor(
    private router: Router
  ) {

  }

  navigateTo(data: any) {
    this.router.navigate([data.route]);
  }

}
