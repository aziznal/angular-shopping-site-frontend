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
  foundProduct: boolean; // set to true once product is found
  notFound: boolean; // set to false if product not found after search
  idToSearch: string;
  productUpdated: boolean;

  constructor(private productService: ProductManagementService) {
    this.product = {} as Product;
    this.foundProduct = false;
    this.notFound = false;
    this.idToSearch = '';
    this.productUpdated = false;
  }

  ngOnInit(): void {}

  findProductById(): void {
    // Don't show form before an item with an ID is entered
    if (this.idToSearch === undefined) {
      this.notFound = true;
      return;
    }

    this.productService.getProduct({ _id: this.idToSearch }, (response) => {
      if (response.status == 404) {
        this.notFound = true;
        return;
      }

      this.notFound = false;
      this.foundProduct = true;

      // TODO: log response.body[msg] (after service refactor)
      // TODO: refactor this to response.body[something] (after service refactor)
      this.product = response[0];
    });
  }

  onSubmit() {
    this.productService.updateProduct(this.product, (response) => {
      if (response.status == 404) {
        // TODO: refactor to use response.body['msg'] instead (after service refactor)
        console.log('Something went wrong');
        console.error(response);
        return;
      }

      this.productUpdated = true;
    });
  }

  onReset() {
    this.product = {} as Product;
    this.foundProduct = false;
    this.notFound = false;
    this.idToSearch = undefined;
    this.productUpdated = false;
  }
}
