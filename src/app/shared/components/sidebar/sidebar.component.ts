import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @Output() menuButtonClick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {

  }

  onMenuButtonClick(): void {
    // this.menuButtonClick.next();
  }

}
