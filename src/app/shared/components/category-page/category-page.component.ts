import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {TtproductInterface} from "../../types/ttproduct.interface";
import {
  addProductToBasket,
  fetchProductsByCategory,
} from "../../../core/store/app-actions";
import {debounceTime, delayWhen, distinctUntilChanged, EMPTY, interval, of, Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";
import {
  basketArraySelector,
  categoriesArraySelector,
  productsArraySelector, selectIsLoadingSelector,
} from "../../../core/store/app-selectors";
import {ActivatedRoute, Params} from "@angular/router";
import {catchError, filter, map, switchMap, tap} from "rxjs/operators";
import {CategoryInterface} from "../../types/category.interface";
import {Breadcrumb} from "../../modules/ui-utils/breadcrumbs/breadcrumb";
import {
  ClassWithPagination
} from "../component-with-pagination/class-with-pagination.directive";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent extends ClassWithPagination implements OnInit, OnDestroy, AfterViewInit {
  breadcrumbs: Breadcrumb[] = [];
  slug: string;
  currentCategory: CategoryInterface;
  id: number;
  @ViewChild('search', {static: true}) search: ElementRef;
  @ViewChild('sortParams') sortParams: ElementRef;

  private subscriptions: Subscription;

  constructor(
    private productServ: ProductService,
    private route: ActivatedRoute,
    private alert: AlertService,
  ) {
    super();
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.initQueryParamsObserver();
    this.initSelectIsLoadingSelectorObserver();
    this.initBasketArraySelectorObserver();
    this.initSlugAndCategoriesArraySelectorObserver();
    this.initProductsArraySelectorObserver();

  }

  private initQueryParamsObserver(): void {
    this.subscriptions.add(this.route.queryParams.subscribe(
        (params: Params) => {
          this.currentPage = Number(params['page'] || '1');
          this.cdr.detectChanges();
        }
      )
    );
  }

  private initSelectIsLoadingSelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(selectIsLoadingSelector).pipe(
        delayWhen(IsLoading => !IsLoading ? interval(1500) : of(true))
      ).subscribe(
        (selectIsLoadingSelector) => {
          this.isLoading = selectIsLoadingSelector;
          this.cdr.detectChanges();
        }
      )
    );
  }

  private initBasketArraySelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(basketArraySelector).subscribe(
        (response: TtproductInterface[]) => {
          this.productsInBasket = response;
          this.cdr.detectChanges();
        }
      )
    );
  }

  private initSlugAndCategoriesArraySelectorObserver(): void {
    this.subscriptions.add(
      this.route.params.pipe(
        tap((value) => {
          this.slug = value["slug"];
          this.tableData = [];
          if (this.router.url && this.router.url.split('?')[0]) {
            this.baseUrl = this.router.url.split('?')[0];
          }
        }),
        switchMap(() => this.store.select(categoriesArraySelector).pipe(
            filter(res => res !== undefined),
            catchError((err) => {
              this.alert.danger(err);
              console.error(err);
              return EMPTY;
            }),
          )
        )
      ).subscribe((response) => {
          if (response && response.length > 0) {
            this.currentCategory = response.find((item: CategoryInterface) => item.slug === this.slug);
            this.breadcrumbs = [
              {label: 'Главная', url: '/'},
              {label: `Товары в категории: ${this.currentCategory?.title}`, url: ''},
            ];
            if (this.currentCategory && this.currentCategory.id) {
              this.store.dispatch(new fetchProductsByCategory({id: this.currentCategory.id}));
            }
          }
          if (this.sortParams) {
            this.sortParams.nativeElement.value = '';
          }
          this.cdr.detectChanges();
        }
      )
    );
  }

  private initProductsArraySelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(productsArraySelector).pipe(
        filter(res => res !== undefined)
      ).subscribe(
        (response: TtproductInterface[]) => {
          this.tableData = response;
          this.setPaginationToFirstPageAndPaginate();
          this.cdr.detectChanges();
        }
      )
    );
  }

  ngAfterViewInit(): void {
    this.sortParams.nativeElement.value = '';
    this.initSearchInputObserver();
  }

  private initSearchInputObserver(): void {
    this.subscriptions.add(
      this.keyupAsValue(this.search.nativeElement).pipe(
        distinctUntilChanged(),
        debounceTime(100),
        switchMap((searchString: string) => {
          this.filterString = searchString;
          return this.store.select(productsArraySelector).pipe(
            map((allProducts: TtproductInterface[]) => {
              return allProducts.filter((item: TtproductInterface) =>
                (item.title && item.title.toString().toUpperCase().includes(searchString.toUpperCase()))
              )
            })
          )
        })
      ).subscribe(
        (response) => {
          this.tableData = response;
          this.setPaginationToFirstPageAndPaginate();
          this.cdr.detectChanges();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.tableData = [];
    this.baseUrl = null;
  }


}
