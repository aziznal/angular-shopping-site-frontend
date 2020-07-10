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
  @ViewChild('nameField', { read: ElementRef }) nameField: ElementRef<any>;

  product: Product;
  productCategories; // to show as a dropdown list

  // to save the id sent from the backend
  idAfterProductCreation: string;

  // if checked, name field will be generated using model and brand
  autogenerateNameFieldToggled: boolean;

  constructor(private productService: ProductManagementService) {
    this.product = {} as Product;
    this.productCategories = categories;

    this.idAfterProductCreation = '';

    this.autogenerateNameFieldToggled = true;
  }

  ngOnInit(): void {}

  //#region Name Field Auto-Generation
  toggleAutogenerateNameField() {
    this.nameField.nativeElement.disabled = !this.autogenerateNameFieldToggled;
  }

  private autogenerateNameField() {
    return this.product.brand + ' ' + this.product.model;
  }
  //#endregion Name Field Auto-Generation

  private removeQuotes(quoted_string: string): string {
    if (quoted_string[0] == '"')
      quoted_string = quoted_string.slice(1, quoted_string.length - 1);

    return quoted_string;
  }

  private createProductAndStoreId() {
    this.productService.createProduct(this.product, (response) => {
      let createdProductId = response.body['inserted_id'];

      createdProductId = this.removeQuotes(createdProductId);

      this.idAfterProductCreation = createdProductId;
    });
  }

  submitButtonOnClick() {
    if (this.autogenerateNameFieldToggled) {
      this.product.name = this.autogenerateNameField();
    }

    this.createProductAndStoreId();
  }

  resetButtonOnClick() {
    this.product = {} as Product;
    this.idAfterProductCreation = '';
  }
}
