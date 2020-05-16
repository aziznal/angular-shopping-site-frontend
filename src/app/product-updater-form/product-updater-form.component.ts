import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../product-management.service';

import { Product } from 'src/templates/product';

@Component({
  selector: 'app-product-updater-form',
  templateUrl: './product-updater-form.component.html',
  styleUrls: ['./product-updater-form.component.css'],
})
export class ProductUpdaterFormComponent implements OnInit {
  constructor(private productService: ProductManagementService) {}

  ngOnInit(): void {}

  //#region Finding the product
  foundProduct: boolean = false; // set to true once product is found
  notFound: boolean = false; // set to false if product not found after search

  idToSearch: string;

  productUpdated: boolean = false;

  findProductById(): void {

    // Don't show form before an item with an ID is entered
    if (this.idToSearch === undefined){
      this.notFound = true;
      return;
    };

    this.productService.getDocs({"_id": this.idToSearch}, (response) => {

      if (response.status == 404) {
        this.notFound = true;
        return;
      }

      console.log(response);

      this.notFound = false;
      this.foundProduct = true;

      this.product = response[0];

      }
    );
  }

  //#endregion Finding the product

  // Initializing from Template
  product = {} as Product;

  onSubmit() {
    this.productService.updateProduct(this.product, (response) => {

      if (response.status == 404) {
        console.log("Something went wrong");
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
