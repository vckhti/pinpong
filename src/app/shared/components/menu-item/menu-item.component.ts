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

  isVertical = true;
  categories: Menu[] = new Array();

  mouseInItem = false;
  popupLeft = 0;
  popupTop = 42;
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
      this.mouseInPopup = false;
    }
  }

  onPopupMouseEnter(event: Event): void {
    if (!this.isVertical) {
      this.mouseInPopup = true;
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    if (!this.isVertical) {
      this.mouseInItem = false;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.isVertical) {
      if (this.item.parent_id) {
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
    if (this.item.parent_id) {
      if (this.isVertical) {
        this.mouseInPopup = !this.mouseInPopup;
      }
    } else if (this.item.slug) {
      const newEvent = new MouseEvent('mouseleave', {bubbles: true});
      //this.renderer.invokeElementMethod(this.el.nativeElement, 'dispatchEvent', [newEvent]);
      this.router.navigate(['category', this.item.slug]);
    }
  }

  findItemByParentId(parentId: number): Menu[] | undefined {
    console.log('findItemByParentId', this.categories.filter((v: Menu) => v.parent_id === parentId));
    return this.categories.filter((v: Menu) => v.parent_id === parentId);
  }

}
