import { Component, OnInit, Input } from '@angular/core';
import {Menu} from "../../types/menu.interface";

@Component({
  selector: 'spa-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.css']
})
export class PopupMenuComponent implements OnInit {
  @Input() menu: Array<Menu>;
  isVertical = true;
  constructor() { }

  ngOnInit() {
  }

}
