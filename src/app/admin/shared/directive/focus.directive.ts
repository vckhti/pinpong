import {Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
  selector: "[focus]" // директиву можно использовать как атрибут и как элемент
})
export class FocusDirective implements OnInit{
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }



}
