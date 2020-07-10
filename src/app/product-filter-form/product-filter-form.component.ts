import { Component, OnInit } from '@angular/core';

import { ProductManagementService } from '../product-management.service';
import { categories } from '../top-side/categories';
import { Product } from 'src/templates/product';

@Component({
  selector: 'app-product-filter-form',
  templateUrl: './product-filter-form.component.html',
  styleUrls: ['./product-filter-form.component.css'],
})
export class ProductFilterFormComponent implements OnInit {
  // Page Variables
  product: Product;

  productCategories;        // To show as a dropdown list

  filteredResults: Product[];
  showResultsTable: boolean;

  constructor(private productService: ProductManagementService) {
    this.product = {} as Product;
    this.productCategories = categories;
    this.filteredResults = [] as Product[];
    this.showResultsTable = false;
  }

  ngOnInit(): void {}

  submitButtonOnClick() {
    this.productService.getProduct(this.product, (response) => {
      this.filteredResults = response.body['results'];
      this.showResultsTable = true;
    });
  }

  resetButtonOnClick() {
    this.product = {} as Product;
    this.filteredResults = [] as Product[];
    this.showResultsTable = false;
  }
}
