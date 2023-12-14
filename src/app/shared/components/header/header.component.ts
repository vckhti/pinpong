import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {debounceTime, distinctUntilChanged, EMPTY, fromEvent, Observable, Subscription} from "rxjs";
import {basketArraySelectorCount} from "../../../core/store/app-selectors";
import {catchError, filter, map, switchMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {ProductService} from "../../services/product.service";
import {AlertService} from "../../services/alert.service";
import {currentUserSelector, isAnonymousSelector} from "../../../modules/auth/store/selectors";
import {CurrentUserInterface} from "../../../modules/auth/types/currentUser.interface";
import {TtproductInterface} from "../../types/ttproduct.interface";
import {fetchCategories, fetchProductsSuccess} from "../../../core/store/app-actions";
import {logOutAction} from "../../../modules/auth/store/actions/login.action";
import {PopupService} from "../../services/popup.service";
import {ScreenService} from "../../services/screen.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  basketArraySelectorCount$: Observable<number> = this.store.select(basketArraySelectorCount).pipe(filter(res => res !== undefined));
  private subscriptions: Subscription;
  currentRouteUrl: string;
  isAnonymousSelector: boolean;
  currentUserSelector: string;
  sidebarVisible = false;
  showExitSpan = false;
  screenWidth: number;

  widthForMobileVersion=900;

  @ViewChild('search') search: ElementRef;

  constructor(
    private router: Router,
    private store: Store,
    private productService: ProductService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private popupService: PopupService,
    public screenService: ScreenService,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscriptions = new Subscription();
    this.currentRouteUrl = this.route['_routerState'].snapshot.url;
   }

  ngOnInit() {
    this.store.dispatch(new fetchCategories());

    this.subscriptions.add(
      this.store.select(isAnonymousSelector).subscribe(
        (response) => {
          this.isAnonymousSelector = response;
          this.cdr.detectChanges();
        }
      )
    );

    this.subscriptions.add(
      this.popupService.isVisible$.subscribe(
        (response) => {
          this.sidebarVisible = response;
          this.cdr.detectChanges();
        }
      )
    );

    this.subscriptions.add(
      this.screenService.getScreenWidth().pipe(
        debounceTime(300),
      ).subscribe(
        (response) => {
          this.screenWidth = response;
          this.cdr.detectChanges();
        }
      )
    );

    this.subscriptions.add(
      this.store.select(currentUserSelector).pipe(
        filter(res => res !== null)
      ).subscribe(
        (response: CurrentUserInterface) => {
          if (response.username) {
            this.currentUserSelector = response.username;
            this.cdr.detectChanges();
          }
        }
      )
    );

    this.subscriptions.add(
      this.router.events.subscribe((response) => {
        this.currentRouteUrl = this.route['_routerState'].snapshot.url;
        this.cdr.detectChanges();
        }
      )
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.keyupAsValue(this.search.nativeElement).pipe(
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((searchString: string) => {
          return this.productService.getProducts().pipe(
            map((allProducts: TtproductInterface[]) => {
              return allProducts.filter((item: TtproductInterface) =>
                (item.title && item.title.toString().toUpperCase().includes(searchString.toUpperCase()))
              )
            }),
            catchError((err) => {
              this.alert.danger(err ?? 'Сервеная ошибка');
              console.error(err);
              return EMPTY;
            })
          )
        })
      ).subscribe(
        (response: TtproductInterface[]) => {
          this.store.dispatch(new fetchProductsSuccess({products: response}));
          this.cdr.detectChanges();
        })
    );
  }

  keyupAsValue(elem: any) {
    return fromEvent(elem, 'keyup').pipe(
      map((event: any) => event.target.value),
    );
  };

  logout() {
    this.store.dispatch(logOutAction());
    location.reload();
  }

  getChildrens(category: any): any[] {
    return Object.values(category.children);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onHamburgerClick(): void {

    this.sidebarVisible = !this.sidebarVisible;
  }

}
