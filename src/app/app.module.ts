import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopSideComponent } from './top-side/top-side.component';
import { PageBodyComponent } from './page-body/page-body.component';
import { BottomSideComponent } from './bottom-side/bottom-side.component';
import { MiddleSideComponent } from './middle-side/middle-side.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopSideComponent,
    PageBodyComponent,
    BottomSideComponent,
    MiddleSideComponent,
    SidebarComponent
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
