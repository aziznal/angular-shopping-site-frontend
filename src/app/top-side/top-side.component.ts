import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-side',
  templateUrl: './top-side.component.html',
  styleUrls: ['./top-side.component.css']
})
export class TopSideComponent implements OnInit {

  links = [
    'About Us',
    'Contact',
    'Missing Delivery',
    'FAQ',
    'Report an issue',
    'Feedback'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
