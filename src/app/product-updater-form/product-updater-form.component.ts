import { Component, OnInit } from '@angular/core';

import { ProductManagementService } from '../product-management.service';

import { Product } from 'src/templates/product';

@Component({
  selector: 'app-product-updater-form',
  templateUrl: './product-updater-form.component.html',
  styleUrls: ['./product-updater-form.component.css'],
})
export class ProductUpdaterFormComponent implements OnInit {

  // Page Variables
  product: Product;
  productHasBeenFound: boolean;
  productNotFound: boolean;
  idToSearch: string;
  productHasBeenUpdated: boolean;

  constructor(private productService: ProductManagementService) {
    this.resetPageVaribles();
  }

  private resetPageVaribles() {
    this.productHasBeenFound = false;
    this.productNotFound = false;
    this.idToSearch = '';
    this.productHasBeenUpdated = false;
    this.product = {} as Product;
  }

  ngOnInit(): void {}

  private confirmIdFieldNotEmpty() {
    if (this.idToSearch === undefined || this.idToSearch.length == 0) {
      this.productNotFound = true;
      return false;
    } else {
      return true;
    }
  }

  private setProductFound() {
    this.productHasBeenFound = true;
    this.productNotFound = false;
  }

  private setProductNotFound() {
    this.productHasBeenFound = false;
    this.productNotFound = true;
  }

  private confirmResponseContainsProduct(response) {
    if (response.body['results'].length > 0) {
      this.setProductFound();
      return true;
    } else {
      this.setProductNotFound();
      return false;
    }
  }

  private handleSearchResponse(response) {
    if (response.status == 404) {
      this.productNotFound = true;
      return;
    }

    if (this.confirmResponseContainsProduct(response))
      this.product = response.body['results'][0];
  }

  private handleUpdateResponse(response) {
    if (response.status == 404) {
      console.log(response.body['msg']);
      console.error(JSON.stringify(response, null, 2));
      return;
    }

    this.productHasBeenUpdated = true;
  }

  //#region Button Click Handlers

  searchButtonOnClick(): void {
    if (!this.confirmIdFieldNotEmpty()) return;

    this.productService.getProduct({ _id: this.idToSearch }, (response) => {
      this.handleSearchResponse(response);
    });
  }

  submitButtonOnClick() {
    this.productService.updateProduct(this.product, (response) => {
      this.handleUpdateResponse(response);
    });
  }

  resetButtonOnClick() {
    this.resetPageVaribles();
  }
  //#endregion

}
