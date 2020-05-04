import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component'
import { PageBodyComponent } from './page-body/page-body.component'

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PageBodyComponent },
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
