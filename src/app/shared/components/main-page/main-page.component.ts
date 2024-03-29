import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {delayWhen, interval, of, Subscription} from "rxjs";
import {
  basketArraySelector,
  productsArraySelector,
  selectIsLoadingSelector
} from "../../../core/store/app-selectors";
import {TtproductInterface} from "../../types/ttproduct.interface";
import {fetchProducts} from "../../../core/store/app-actions";
import {
  ClassWithPagination
} from "../component-with-pagination/class-with-pagination.directive";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent extends ClassWithPagination implements OnInit, OnDestroy {
  private subscriptions: Subscription;
  tempArray: TtproductInterface[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
    super();
    this.subscriptions = new Subscription();
    this.initBaseUrl();
  }

  private initBaseUrl(): void {
    if (this.router.url && this.router.url.split('?')[0]) {
      this.baseUrl = this.router.url.split('?')[0];
    }
  }

  ngOnInit() {
    this.store.dispatch(new fetchProducts());

    this.initBasketArraySelectorObserver();
    this.initSelectIsLoadingSelectorObserver();
    this.initProductsArraySelectorObserver();
    this.initQueryParamsObserver();
  }

  private initBasketArraySelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(basketArraySelector).subscribe(
        (response: TtproductInterface[]) => {
          this.productsInBasket = [...response];
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
        (selectIsLoadingSelector: boolean) => {
          this.isLoading = selectIsLoadingSelector;
          this.cdr.detectChanges();
        }
      )
    );
  }

  private initProductsArraySelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(productsArraySelector).pipe(
      ).subscribe(
        (response: any) => {
          this.tableData = response;
          this.setPaginationToFirstPageAndPaginate();
          this.cdr.detectChanges();
        }
      )
    );
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.tableData = [];
    this.baseUrl = null;
    this.tempArray = [];
    this.isLoading = false;
  }

}
