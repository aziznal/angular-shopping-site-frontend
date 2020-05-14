import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
