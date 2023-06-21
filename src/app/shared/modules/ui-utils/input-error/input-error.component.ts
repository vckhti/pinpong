import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.less']
})
export class InputErrorComponent implements OnInit {

	@Input() error?: string|string[];
	@ViewChild('content') content?: ElementRef;
	
  constructor() { }

  ngOnInit(): void {
  }

}
