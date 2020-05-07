import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Product } from '../../templates/product';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css'],
})
export class ProductCreatorComponent implements OnInit {
  product = {
    id: '',
    name: '',
    img: '',
    price: '',
    rating: '',
    comments: '',
    specs: '',
    seller: '',
    sold: 0,

    [Symbol.iterator]: function* () {
      let properties = Object.keys(this);
      for (let i of properties) {
        yield i;
      }
    }

  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {

  }
}
