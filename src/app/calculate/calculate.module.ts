import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculateComponent } from './calculate.component';
import { AgeComponent } from './features/age/age.component';
import { CalculateRoutingModule } from './calculate-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CalculateComponent,
    AgeComponent
  ],
  imports: [
    CommonModule,
    CalculateRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class CalculateModule { }
