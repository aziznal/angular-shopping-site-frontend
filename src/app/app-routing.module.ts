import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { DefaultPageComponent } from './default-page/default-page.component';
import { DebugPageComponent } from './debug-page/debug-page.component';
import { ProductCreatorComponent } from './product-creator/product-creator.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductFormsPageComponent } from './product-forms-page/product-forms-page.component';
import { ProductUpdaterFormComponent } from './product-updater-form/product-updater-form.component';
import { ProductRemoverFormComponent } from './product-remover-form/product-remover-form.component';
import { ProductFilterFormComponent } from './product-filter-form/product-filter-form.component';
import { SingleProductPageComponent } from './single-product-page/single-product-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateAccountPageComponent } from './create-account-page/create-account-page.component';
import { UserAccountPageComponent } from './user-account-page/user-account-page.component';
import { UpdateInfoPageComponent } from './user-account-page/update-info-page/update-info-page.component';
import { CartCheckoutPageComponent } from './cart-checkout-page/cart-checkout-page.component';

const routes: Routes = [
  { path: '', component: DefaultPageComponent },
  { path: 'debug', component: DebugPageComponent },

  { path: 'category/:category', component: ProductsPageComponent },

  // ### Product Forms:
  { path: 'debug/product-forms-page', component: ProductFormsPageComponent },
  { path: 'debug/product-forms-page/creator', component: ProductCreatorComponent },
  { path: 'debug/product-forms-page/updater', component: ProductUpdaterFormComponent },
  { path: 'debug/product-forms-page/remover', component: ProductRemoverFormComponent },
  { path: 'debug/product-forms-page/filter', component: ProductFilterFormComponent },

  { path: 'p/:_id', component: SingleProductPageComponent },

  // ### User related
  { path: 'login', component: LoginPageComponent },
  { path: 'create-user-account', component: CreateAccountPageComponent },
  { path: 'user-account', component: UserAccountPageComponent },
  { path: 'user-account/update-info', component: UpdateInfoPageComponent },

  // ### Cart
  { path: 'cart', component: CartCheckoutPageComponent },
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
