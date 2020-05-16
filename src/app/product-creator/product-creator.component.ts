import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ProductManagementService } from '../product-management.service';

import { Product } from '../../templates/product';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css'],
})
export class ProductCreatorComponent implements OnInit {
  //#region Name Field Auto-Generation
  @ViewChild('nameField', { read: ElementRef }) nameField: ElementRef<any>;

  // if checked, name field will be generated using model and brand
  name_checkbox: boolean = true;

  updateNameField() {
    this.nameField.nativeElement.disabled = !this.name_checkbox;
  }

  generateName() {
    return this.product.brand + ' ' + this.product.model;
  }

  //#endregion Name Field Auto-Generation

  product = {} as Product;

  // this will be sent back by the server after product creation
  product_id: string;

  constructor(private productService: ProductManagementService) {}

  ngOnInit(): void {}

  // Form Submit Button
  onSubmit() {
    // auto-generate name
    if (this.name_checkbox) {
      this.product.name = this.generateName();
    }

    this.productService.createProduct(this.product, (response: string) => {
      // Response may include quotes at the start and finish, this gets rid of em
      if (response[0] == '"') response = response.slice(1, response.length - 1);

      this.product_id = response;
    });
  }

  // Form Reset Button
  onReset() {
    this.product = {} as Product;
    this.product_id = '';
  }
}
