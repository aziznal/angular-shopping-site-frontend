import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopSideComponent } from './top-side/top-side.component';
import { PageBodyComponent } from './page-body/page-body.component';

@NgModule({
  declarations: [
    AppComponent,
    TopSideComponent,
    PageBodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
