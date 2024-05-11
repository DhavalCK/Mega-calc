import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgeComponent } from './features/age/age.component';
import { CalculateComponent } from './calculate.component';
import { ReturnPercentComponent } from './features/return-percent/return-percent.component';

const routes: Routes = [
  { 
    path: '',
    component: CalculateComponent,
    children: [
      {
        path: 'age',
        component: AgeComponent
      }, 
      {
        path: 'return-percent',
        component: ReturnPercentComponent
      }
    ]
  }
  // Define other routes as needed
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CalculateRoutingModule { }
