import {Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements OnInit{
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }



}
