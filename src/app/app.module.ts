import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormatNumberPipe } from './shared/pipes/format-number.pipe';
@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        SharedModule,
        BrowserAnimationsModule,
        AppRoutingModule,
    ],
    providers: [FormatNumberPipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
