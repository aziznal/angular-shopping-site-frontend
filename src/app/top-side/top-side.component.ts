import { Component, OnInit } from '@angular/core';
import { links } from "./links";
import { categories } from "./categories";

@Component({
  selector: 'app-top-side',
  templateUrl: './top-side.component.html',
  styleUrls: ['./top-side.component.css']
})
export class TopSideComponent implements OnInit {

  links = links;
  categories = categories;

  constructor() { }

  ngOnInit(): void {
  }

}
