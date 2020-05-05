import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component'
import { DefaultPageComponent } from './default-page/default-page.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DefaultPageComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
