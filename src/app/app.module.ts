import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopSideComponent } from './top-side/top-side.component';
import { BottomSideComponent } from './bottom-side/bottom-side.component';
import { MiddleSideComponent } from './middle-side/middle-side.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { DebugPageComponent } from './debug-page/debug-page.component';
import { ProductCreatorComponent } from './product-creator/product-creator.component';
import { ProductCommentAdderComponent } from './product-comment-adder/product-comment-adder.component';
import { ProductSpecAdderComponent } from './product-spec-adder/product-spec-adder.component';
import { TestProductsPageComponent } from './test-products-page/test-products-page.component';
import { ServiceTestPageComponent } from './service-test-page/service-test-page.component';
import { ProductFormsPageComponent } from './product-forms-page/product-forms-page.component';
import { ProductRemoverFormComponent } from './product-remover-form/product-remover-form.component';
import { ProductFilterFormComponent } from './product-filter-form/product-filter-form.component';
import { ProductUpdaterFormComponent } from './product-updater-form/product-updater-form.component';
import { PageSelectorComponent } from './page-selector/page-selector.component';
import { SingleProductPageComponent } from './single-product-page/single-product-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateAccountPageComponent } from './create-account-page/create-account-page.component';
import { UserManagementService } from './user-management.service';
import { UserAccountPageComponent } from './user-account-page/user-account-page.component';
import { UpdateInfoPageComponent } from './user-account-page/update-info-page/update-info-page.component';
import { UserAccountSidebarComponent } from './user-account-page/user-account-sidebar/user-account-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopSideComponent,
    BottomSideComponent,
    MiddleSideComponent,
    SidebarComponent,
    DefaultPageComponent,
    DebugPageComponent,
    ProductCreatorComponent,
    ProductCommentAdderComponent,
    ProductSpecAdderComponent,
    TestProductsPageComponent,
    ServiceTestPageComponent,
    ProductFormsPageComponent,
    ProductRemoverFormComponent,
    ProductFilterFormComponent,
    ProductUpdaterFormComponent,
    PageSelectorComponent,
    SingleProductPageComponent,
    LoginPageComponent,
    CreateAccountPageComponent,
    UserAccountPageComponent,
    UpdateInfoPageComponent,
    UserAccountSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
     CookieService,
     UserManagementService
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
