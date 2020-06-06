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
  categories;
  results: Product[];
  show_results: boolean;

  constructor(private productService: ProductManagementService) {
    this.product = {} as Product;
    this.categories = categories;
    this.results = [] as Product[];
    this.show_results = false;
  }

  ngOnInit(): void {}

  // Form Submit Button
  onSubmit() {
    this.productService.getProduct(this.product, (response) => {
      this.results = response.body['results'];
      this.show_results = true;
    });
  }

  // Form Reset Button
  onReset() {
    this.product = {} as Product;
    this.results = [] as Product[];
    this.show_results = false;
  }
}
