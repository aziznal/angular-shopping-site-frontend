import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { DefaultPageComponent } from './default-page/default-page.component';
import { DebugPageComponent } from './debug-page/debug-page.component';
import { ProductCreatorComponent } from './product-creator/product-creator.component';
import { TestProductsPageComponent } from './test-products-page/test-products-page.component';
import { ServiceTestPageComponent } from './service-test-page/service-test-page.component';
import { ProductFormsPageComponent } from './product-forms-page/product-forms-page.component';
import { ProductUpdaterFormComponent } from './product-updater-form/product-updater-form.component';
import { ProductRemoverFormComponent } from './product-remover-form/product-remover-form.component';
import { ProductFilterFormComponent } from './product-filter-form/product-filter-form.component';

const routes: Routes = [
  { path: '', component: DefaultPageComponent },
  { path: 'debug', component: DebugPageComponent },
  { path: 'debug/product-test-page', component: TestProductsPageComponent },
  { path: 'debug/service-test-page', component: ServiceTestPageComponent },


  // Product Manipulation Forms' paths:
  { path: 'debug/product-forms-page', component: ProductFormsPageComponent },
  { path: 'debug/product-forms-page/creator', component: ProductCreatorComponent },
  { path: 'debug/product-forms-page/updater', component: ProductUpdaterFormComponent },
  { path: 'debug/product-forms-page/remover', component: ProductRemoverFormComponent },
  { path: 'debug/product-forms-page/filter', component: ProductFilterFormComponent },

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
