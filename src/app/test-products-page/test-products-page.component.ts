import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductManagementService } from '../product-management.service';

import { search_filters } from './search-filters';
import { Product } from 'src/templates/product';

@Component({
  selector: 'app-test-products-page',
  templateUrl: './test-products-page.component.html',
  styleUrls: ['./test-products-page.component.css'],
})
export class TestProductsPageComponent implements OnInit {
  constructor(
    private productService: ProductManagementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadData(params.category);
    })
  }

  // Page Variables
  products: Product[] | null;
  search_filters = search_filters;

  loadData(category: string){

    this.productService.getDocs({"category": category}, (response) => {
      if (response.status == 404) console.log("No Products Were Found!");

      console.log("Found " + response.length + " Products!");
      this.products = response;
    });


    return true;
  }

  //#region Rating Stars

  generateStarsCapacity(difference: number){
    const percentage = difference * 100;

    /*
    note: no need for double sided comparison (prev_num < target < next_num)
    because 'return' stops the method from progressing either way
    */

    if (percentage >= 75) {
      return "three-quarters"
    }

    if (percentage >= 50) {
      return "half";
    }

    if (percentage > 0){
      return "quarter"
    }

    // if all above fails, then percentage == 0
    return "empty";

  }

  generateStarsPath(stars: string[]){
    stars.map((val, key) => {
      stars[key] = "../../assets/rating-star/" + val + ".png";
    })
  }

  // Star Generator Method
  generateStars(rating: number){

    const stars = [];

    for (let i = 0; i < 5; i++){

      // All stars start out empty
      stars[i] = "empty";

      if (rating >= i){

        // Full star + potential overflow to next star
        if (rating - i >= 1){
          stars[i] = "full";
          continue;
        }

        // Fraction of a star
        else if (rating - i < 1 || rating != i){
          stars[i] = this.generateStarsCapacity(rating - i);
          continue;
        }

      }

    }

    this.generateStarsPath(stars);
    return stars;
  }

  //#endregion Rating Stars

}
