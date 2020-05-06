import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopSideComponent } from './top-side/top-side.component';
import { BottomSideComponent } from './bottom-side/bottom-side.component';
import { MiddleSideComponent } from './middle-side/middle-side.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { DebugPageComponent } from './debug-page/debug-page.component';
import { ProductCreatorComponent } from './product-creator/product-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    TopSideComponent,
    BottomSideComponent,
    MiddleSideComponent,
    SidebarComponent,
    DefaultPageComponent,
    DebugPageComponent,
    ProductCreatorComponent
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
