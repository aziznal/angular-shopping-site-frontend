import { Component, OnInit } from '@angular/core';

import { ProductManagementService } from '../product-management.service';

import { Product } from 'src/templates/product';

@Component({
  selector: 'app-product-remover-form',
  templateUrl: './product-remover-form.component.html',
  styleUrls: ['./product-remover-form.component.css'],
})
export class ProductRemoverFormComponent implements OnInit {

  // Page Variables
  foundProduct: boolean; // set to true once product is found after search
  notFound: boolean; // set to false if product not found after search
  idToSearch: string;
  productRemoved: boolean;
  product: Product;

  constructor(private productService: ProductManagementService) {
    this.foundProduct = false;
    this.notFound = false;
    this.idToSearch = '';
    this.productRemoved = false;
    this.product = {} as Product;
  }

  ngOnInit(): void {}

  findProductById(): void {
    // Don't show form before an item with an ID is entered
    if (this.idToSearch === undefined) {
      this.notFound = true;
      return;
    }

    this.productService.getProduct({ _id: this.idToSearch }, (response) => {
      // TODO: check this still works after service refactor
      if (response.status == 404) {
        this.notFound = true;
        return;
      }

      this.notFound = false;
      this.foundProduct = true;

      // TODO: refactor to response.body[0] instead (after service refactor)
      this.product = response[0];
    });
  }

  // Submit Button
  onSubmit() {
    this.productService.removeProduct(this.product, (response) => {

      if (response.status == 404) {
        console.log('Something went wrong');
        console.error(JSON.stringify(response, null, 2));
        return;
      }

      // TODO: log response.body['msg'] (after service refactor)
      this.productRemoved = true;

    });
  }

  // Reset Button
  onReset() {
    this.product = {} as Product;
    this.foundProduct = false;
    this.notFound = false;
    this.idToSearch = undefined;
    this.productRemoved = false;
  }
}
