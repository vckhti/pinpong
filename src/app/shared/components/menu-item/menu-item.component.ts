import {Component, OnInit, Input, ElementRef, HostListener, HostBinding, Renderer2} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Menu} from "../../types/menu.interface";
import {debounceTime, delay, distinctUntilChanged, first, Subscription, take} from "rxjs";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'spa-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  @Input() item: Menu;
  @HostBinding('class.parent-for-popup')
  @Input() parentIsPopup = true;
  mouseInPopup = false;

  isVertical = false;
  categories: Menu[] = new Array();

  mouseInItem = false;
  popupLeft = 0;
  popupTop = 38;
  isActiveRoute = false;
  private subscriptions = new Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit() {



    this.checkingActiveRoute(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkingActiveRoute(event.url);
      }
    });
  }

  checkingActiveRoute(route: string): void {
    this.isActiveRoute = (route === this.item.slug);
  }

  onPopupMouseLeave(event: Event): void {
    if (!this.isVertical) {
      setTimeout(() => this.mouseInPopup = false,500);
    }
  }

  onPopupMouseEnter(event: Event): void {
    console.log('onPopupMouseEnter');
    if (!this.isVertical) {
      this.mouseInPopup = true;
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    console.log('onMouseLeave');
    if (!this.isVertical) {
      this.mouseInItem = false;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    console.log('onMouseEnter', this.item);
    if (!this.isVertical) {
      if (this.item.children.length) {
        console.log('mouseInItem');
        this.mouseInItem = true;
        if (this.parentIsPopup) {
          this.popupLeft = 160;
          this.popupTop = 0;
        }
      }
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.stopPropagation();
    if (this.item.children.length > 0) {
      if (this.isVertical) {
        this.mouseInPopup = !this.mouseInPopup;
      }
    } else if (this.item.slug) {
      const newEvent = new MouseEvent('mouseleave', {bubbles: true});
      //this.renderer.invokeElementMethod(this.el.nativeElement, 'dispatchEvent', [newEvent]);
      this.router.navigate(['category', this.item.slug]);
    }
  }


}
