import { Directive, HostBinding, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "tr"
})
export class ClickableElementDirective {

  constructor() {
  }

  @HostBinding("class.mouseenter") isClicked: boolean = false;

  @HostListener("mouseenter") onMouseDown() {
    this.isClicked = true;
  }

  @HostListener("mouseleave") onMouseUp() {
    this.isClicked = false;
  }

}
