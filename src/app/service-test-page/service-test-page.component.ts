import { Component, OnInit } from '@angular/core';

import { ProductManagementService } from '../product-management.service';

@Component({
  selector: 'app-service-test-page',
  templateUrl: './service-test-page.component.html',
  styleUrls: ['./service-test-page.component.css']
})
export class ServiceTestPageComponent implements OnInit {

  constructor(public productService: ProductManagementService) { }

  ngOnInit(): void {
  }

  testButton(){

    this.productService.test().subscribe((data) => {
      console.log(data);
    })

    console.log("End of Test");

  }

}
