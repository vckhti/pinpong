import { Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: "tr"
})
export class HighlightDirective {

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
