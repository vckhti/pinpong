import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {CategoryInterface} from "../../types/category.interface";

@Component({
  selector: 'spa-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupMenuComponent implements OnInit {
  @Input() menu: Array<CategoryInterface>;
  isVertical = true;
  constructor() { }

  ngOnInit() {
  }

}
