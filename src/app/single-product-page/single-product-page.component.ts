import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductManagementService } from '../product-management.service';
import { CartServiceService } from '../cart-service.service';
import { UserManagementService } from '../user-management.service';

import { Product } from '../../templates/product';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.css'],
})
export class SingleProductPageComponent implements OnInit, OnDestroy {
  // ### Page Variables
  product: Product;
  currentAddCounter: number;
  productRatingStars: string[];

  freakOutEnabled: false;
  freakOutInterval; // to clear interval once done freaking out

  productHasBeenFound: boolean;

  subscriptions: Subscription[];

  constructor(
    private productService: ProductManagementService,
    private userCart: CartServiceService,
    private userService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.product = {} as Product;
    this.currentAddCounter = 1;
    this.productHasBeenFound = true;

    this.subscriptions = [] as Subscription[];
  }

  private queueObservableForUnsubscription(observable: Subscription) {
    this.subscriptions.push(observable);
  }

  private getProductIdFromUrl() {
    return new Promise((resolve, reject) => {
      let params = this.route.params;

      let observable = params.subscribe((params) => {
        this.product._id = params._id;
      });

      resolve();

      this.queueObservableForUnsubscription(observable);
    });
  }

  private handleServerResponse(response) {
    if (response.status == 404) {
      this.productHasBeenFound = false;
      return;
    }

    if (response.status == 400) {
      console.log(response.body['mgs']);
      this.productHasBeenFound = false;
      return;
    }

    this.product = response.body['results'];
    this.productHasBeenFound = true;

    this.productRatingStars = this.productService.generateStars(
      this.product.rating
    );
  }

  async ngOnInit() {
    await this.getProductIdFromUrl();

    // then load data from backend
    this.productService.simpleProductQuery(this.product, true, (response) => {
      this.handleServerResponse(response);
    });
  }

  private unsubscribeFromAllObservables() {
    this.subscriptions.forEach((observable) => {
      observable.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.unsubscribeFromAllObservables();
  }

  private checkUserLoggedIn() {
    // TODO: pass url to redirect to after user sign-in
    if (!this.userService.userIsLoggedIn) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }

  private showItemHasBeenAdded() {
    // TODO: show notification when an item is added to the cart
    console.log('Item Added to cart');
  }

  async addToCartButtonOnClick() {
    // not allowed to use button while freaking out
    if (this.freakOutEnabled) return;

    if (!this.checkUserLoggedIn()) return;

    await this.userCart.addItem(this.product._id, this.currentAddCounter);

    this.showItemHasBeenAdded();
  }

  // ### A stupid little joke for when users decrease the product amount to 0
  freakOut() {
    this.currentAddCounter = 255;
    this.freakOutInterval = setInterval((_) => {
      this.currentAddCounter--;
    }, 0);

    setTimeout((_) => {
      clearInterval(this.freakOutInterval);
      this.currentAddCounter = 1;
    }, 1500);
  }

  productCounterIncreaseOnClick() {
    if (this.currentAddCounter < 99) {
      this.currentAddCounter++;
    } else {
      alert('Warning. Maximum item amount exceeded.');
    }
  }

  productCounterDecreaseOnClick() {
    if (this.currentAddCounter > 1) {
      this.currentAddCounter--;
    } else {
      this.freakOut();
    }
  }
}
