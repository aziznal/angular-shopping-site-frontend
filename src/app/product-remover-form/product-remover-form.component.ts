import { Component, OnInit } from '@angular/core';

import { ProductManagementService } from '../product-management.service';

import { Product } from 'src/templates/product';

@Component({
  selector: 'app-product-remover-form',
  templateUrl: './product-remover-form.component.html',
  styleUrls: ['./product-remover-form.component.css'],
})
export class ProductRemoverFormComponent implements OnInit {
  constructor(private productService: ProductManagementService) {}

  ngOnInit(): void {}

  //#region Finding the product
  foundProduct: boolean = false; // set to true once product is found
  notFound: boolean = false; // set to false if product not found after search

  idToSearch: string;

  productRemoved: boolean = false;

  findProductById(): void {
    // Don't show form before an item with an ID is entered
    if (this.idToSearch === undefined) {
      this.notFound = true;
      return;
    }

    this.productService.getDocs({ _id: this.idToSearch }, (response) => {
      if (response.status == 404) {
        this.notFound = true;
        return;
      }

      console.log(response);

      this.notFound = false;
      this.foundProduct = true;

      this.product = response[0];
    });
  }

  //#endregion Finding the product

  // Initializing from Template
  product = {} as Product;

  // Submit Button
  onSubmit() {
    this.productService.removeProduct(this.product, (response) => {
      if (response.status == 404) {
        console.log('Something went wrong');
        console.error(response);
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
