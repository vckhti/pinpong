import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TtproductInterface} from "../../../shared/types/ttproduct.interface";
import {
  addProductToBasket, fetchCategories,
  fetchProductsByCategory,
  removeProductFromBasket
} from "../../../core/store/app-actions";
import {debounceTime, delayWhen, distinctUntilChanged, EMPTY, interval, of, Subscription} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {
  basketArraySelector,
  categoriesArraySelector,
  productsArraySelector, selectIsLoadingSelector,
} from "../../../core/store/app-selectors";
import {ActivatedRoute, Params} from "@angular/router";
import {catchError, filter, map, switchMap, tap} from "rxjs/operators";
import {CategoryInterface} from "../../../shared/types/category.interface";
import {Breadcrumb} from "../../../shared/modules/ui-utils/breadcrumbs/breadcrumb";
import {
  ComponentWithPaginationComponent
} from "../../../shared/components/component-with-pagination/component-with-pagination.component";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent extends ComponentWithPaginationComponent implements OnInit, OnDestroy, AfterViewInit {
  breadcrumbs: Breadcrumb[] = [];
  private subscriptions: Subscription;
  slug: string;
  currentCategory: CategoryInterface;
  id: number;
  @ViewChild('search', {static: true}) search: ElementRef;
  @ViewChild('sortParams') sortParams: ElementRef;

  constructor(
    private productServ: ProductService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {
    super();
    this.subscriptions = new Subscription();

  }

  ngOnInit() {
    this.subscriptions.add(this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
      }
      )
    );

    this.subscriptions.add(
      this.store.select(selectIsLoadingSelector).pipe(
        delayWhen(IsLoading => !IsLoading ? interval(1500) : of(true))
      ).subscribe(
        (selectIsLoadingSelector) => {
          this.isLoading = selectIsLoadingSelector;
        }
      )
    );

    this.subscriptions.add(
      this.store.select(basketArraySelector).subscribe(
        (response: TtproductInterface[]) => {
          this.productsInBasket = response;
        }
      )
    );

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
        }
      )
    );

    this.subscriptions.add(
      this.store.select(productsArraySelector).pipe(
        filter(res => res !== undefined)
      ).subscribe(
        (response: TtproductInterface[]) => {
          this.tableData = response;
          this.setPaginationToFirstPageAndPaginate();
        }
      )
    );
  }

  ngAfterViewInit(): void {
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
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.tableData = [];
    this.baseUrl = null;
  }

  addItemToCart(product: TtproductInterface) {
    this.store.dispatch(new addProductToBasket({product: product}));
    this.alertService.success(`${product.title} успешно добавлен в корзину!`);
  }

  removeItemFromCart(product: TtproductInterface) {
    this.store.dispatch(new removeProductFromBasket({product: product}));
  }

}
