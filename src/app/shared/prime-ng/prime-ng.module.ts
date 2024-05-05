import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CardModule,
    CalendarModule,
    ButtonModule,
  ],
  exports: [
    CardModule,
    CalendarModule,
    ButtonModule,
  ]
})
export class PrimeNgModule { }
