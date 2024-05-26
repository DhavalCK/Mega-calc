import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatNumberPipe } from './pipes/format-number.pipe';
import { LoaderComponent } from './components/loader/loader.component';
// import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    FormatNumberPipe,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    
  ], 
  exports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    FormatNumberPipe,
    LoaderComponent
    // DragDropModule
  ]
})
export class SharedModule { }
