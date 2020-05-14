import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Product } from '../../templates/product';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css'],
})
export class ProductCreatorComponent implements OnInit {

  //#region Name Field Auto-Generation

  @ViewChild("nameField", {read: ElementRef}) nameField: ElementRef<any>;

  // if checked, name field will be generated using model and brand
  name_checkbox: boolean = true;

  updateNameField() {
    this.nameField.nativeElement.disabled = !this.name_checkbox;
  }

  //#endregion Name Field Auto-Generation

  // Initializing from Template
  product: typeof Product = {
    category: null,
    brand: null,
    model: '',
    name: '',
    price: 0,
    rating: 1,
    sold: 0
  };

  constructor() {}

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("Submitted product successfully");

    Object.keys(this.product).map((key, _) => {
      console.log(`${key}: ${this.product[key]}`);
    })

  }
}
