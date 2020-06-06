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
      if (response.status == 404) {
        this.notFound = true;
        return;
      }

      this.notFound = false;
      this.foundProduct = true;

      this.product = response.body['results'][0];
    });
  }

  // Submit Button
  onSubmit() {
    this.productService.removeProduct(this.product, (response) => {

      if (response.status == 404) {
        console.log(response.body['msg']);
        console.error(JSON.stringify(response, null, 2));
        return;
      }

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
