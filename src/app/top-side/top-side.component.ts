import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
