import { Component, OnInit } from '@angular/core';
import { Product } from 'src/templates/product';

@Component({
  selector: 'app-product-updater-form',
  templateUrl: './product-updater-form.component.html',
  styleUrls: ['./product-updater-form.component.css']
})
export class ProductUpdaterFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  foundProduct: boolean = false;  // set to true once product is found
  notFound: boolean;              // set to false if product not found after search

  idToSearch: string;

  findProductById(): void {
    // TODO: Set this method up once backend is ready
    this.foundProduct = true;
    this.notFound = false;
  }

  // Initializing from Template
  product = {} as Product;

  onSubmit() {
    console.log("Submitted product successfully");

    Object.keys(this.product).map((key, _) => {
      console.log(`${key}: ${this.product[key]}`);
    })

  }

}
