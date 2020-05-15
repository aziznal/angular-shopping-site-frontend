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


  // GET Handler
  getButtonOnclick(){
    this.productService.getTest().subscribe((data) => {
      console.log(data);
    });

  }

  // POST Handler
  postButtonOnclick() {
    this.productService.postTest().subscribe((data) => {
      console.log(data);
    });

  }

  // PUT Handler
  putButtonOnclick() {
    this.productService.putTest().subscribe((data) => {
      console.log(data);
    });
  }

  // DELETE Handler
  deleteButtonOnclick() {
    this.productService.deleteTest().subscribe((data) => {
      console.log(data);
    })
  }

  // Server Response Test
  ServerResponseTestOnClick() {
    this.productService.serverResponseTest().subscribe((data) => {
      console.log(data.body);
    })
  }

}
