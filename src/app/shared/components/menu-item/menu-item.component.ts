import {
  Component,
  OnInit,
  Input,
  HostListener,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef, OnDestroy
} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {ProductService} from "../../services/product.service";
import {CategoryInterface} from "../../types/category.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'spa-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input() item: CategoryInterface;
  @HostBinding('class.parent-for-popup')
  @Input() parentIsPopup = true;
  mouseInPopup = false;

  isVertical = false;
  categories: CategoryInterface[] = new Array();

  mouseInItem = false;
  popupLeft = 0;
  popupTop = 38;
  isActiveRoute = false;

  private subscriptions = new Subscription();

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.checkingActiveRoute(this.router.url);
    this.initRouterEventsObserver();
  }

  private checkingActiveRoute(route: string): void {
    this.isActiveRoute = (route === this.item.slug);
  }

  private initRouterEventsObserver(): void {
    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.checkingActiveRoute(event.url);
          this.cdr.detectChanges();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onPopupMouseLeave(event: Event): void {
    if (!this.isVertical) {
      setTimeout(() => {
        this.mouseInPopup = false;
        this.cdr.detectChanges();
      }, 500);
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
      if (this.item.children.length) {
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
      this.router.navigate(['category', this.item.slug]);
    }
  }


}
