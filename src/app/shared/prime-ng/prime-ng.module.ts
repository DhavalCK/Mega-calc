import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

const FORM_FIELD_MODULES = [
  CalendarModule,
  ButtonModule,
  DropdownModule,
  InputNumberModule,
  ProgressSpinnerModule,
]
const MODULES = [
  ...FORM_FIELD_MODULES,
    CardModule,
    TabViewModule,
    TableModule
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
  ]
})
export class PrimeNgModule { }
