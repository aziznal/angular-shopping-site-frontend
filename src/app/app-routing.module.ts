import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { DefaultPageComponent } from './default-page/default-page.component';
import { DebugPageComponent } from './debug-page/debug-page.component';
import { ProductCreatorComponent } from './product-creator/product-creator.component';
import { TestProductsPageComponent } from './test-products-page/test-products-page.component';

const routes: Routes = [
  { path: '', component: DefaultPageComponent },
  { path: 'debug', component: DebugPageComponent },
  { path: 'debug/product-creator', component: ProductCreatorComponent},
  { path: 'debug/product-test-page', component: TestProductsPageComponent }
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
