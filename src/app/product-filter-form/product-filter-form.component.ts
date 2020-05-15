import { Component, OnInit } from '@angular/core';
import { Product } from 'src/templates/product';

@Component({
  selector: 'app-product-filter-form',
  templateUrl: './product-filter-form.component.html',
  styleUrls: ['./product-filter-form.component.css']
})
export class ProductFilterFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  product = {} as Product;

  onSubmit(){

    console.log(this.product);

    Object.keys(this.product).map((key, _) => {
      console.log(`${key}: ${this.product[key]}`);
    })
  }

}
