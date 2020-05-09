import { Component, OnInit } from '@angular/core';

import { search_filters } from './search-filters';
import { test_products } from '../../assets/product-sample';


@Component({
  selector: 'app-test-products-page',
  templateUrl: './test-products-page.component.html',
  styleUrls: ['./test-products-page.component.css']
})
export class TestProductsPageComponent implements OnInit {


  products = test_products;
  search_filters = search_filters;


  constructor() { }

  ngOnInit(): void {
  }

}
