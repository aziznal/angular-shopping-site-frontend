import { Component, OnInit } from '@angular/core';

import { Product } from 'src/templates/product';

import { ProductManagementService } from '../product-management.service';

@Component({
  selector: 'app-product-filter-form',
  templateUrl: './product-filter-form.component.html',
  styleUrls: ['./product-filter-form.component.css'],
})
export class ProductFilterFormComponent implements OnInit {
  constructor(private productService: ProductManagementService) {}

  ngOnInit(): void {}

  product = {} as Product;
  results = {} as Product | Product[];
  show_results: boolean = false;

  // Form Submit Button
  onSubmit() {
    console.log(this.product);

    this.productService.getDocs(this.product, (search_results) => {
      this.results = search_results;
      this.show_results = true;

      console.log('\nGot the following as response from the server:\n');
      console.log(this.results);
    });
  }

  // Form Reset Button
  onReset() {
    this.product = {} as Product;
    this.results = {} as Product | Product[];
    this.show_results = false;
  }
}
