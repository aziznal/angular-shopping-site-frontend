import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ProductManagementService } from '../product-management.service';
import { categories } from '../top-side/categories';
import { Product } from '../../templates/product';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css'],
})
export class ProductCreatorComponent implements OnInit {
  // Page Variables
  product: Product;
  categories; // to hold product categories

  // to save the id sent back by the server
  product_id: string;

  // if checked, name field will be generated using model and brand
  name_checkbox: boolean;

  constructor(private productService: ProductManagementService) {
    this.categories = categories;
    this.product = {} as Product;
    this.product_id = '';
    this.name_checkbox = true;
  }

  ngOnInit(): void {}

  //#region Name Field Auto-Generation
  @ViewChild('nameField', { read: ElementRef }) nameField: ElementRef<any>;

  updateNameField() {
    this.nameField.nativeElement.disabled = !this.name_checkbox;
  }

  generateName() {
    return this.product.brand + ' ' + this.product.model;
  }

  //#endregion Name Field Auto-Generation

  // Form Submit Button
  onSubmit() {
    // auto-generate name
    if (this.name_checkbox) {
      this.product.name = this.generateName();
    }

    this.productService.createProduct(this.product, (response) => {
      // Response may include quotes at the start and finish, this gets rid of em
      let inserted_product_id = response.body['inserted_id'];
      if (inserted_product_id[0] == '"')
        inserted_product_id = inserted_product_id.slice(1, inserted_product_id.length - 1);

      this.product_id = inserted_product_id;
    });
  }

  // Form Reset Button
  onReset() {
    this.product = {} as Product;
    this.product_id = '';
  }
}
