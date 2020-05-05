import { Component, OnInit } from '@angular/core';
import { links } from "./links";

@Component({
  selector: 'app-top-side',
  templateUrl: './top-side.component.html',
  styleUrls: ['./top-side.component.css']
})
export class TopSideComponent implements OnInit {

  links = links;

  constructor() { }

  ngOnInit(): void {
  }

}
