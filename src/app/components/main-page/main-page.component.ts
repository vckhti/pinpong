import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {delayWhen, interval, of, Subscription} from "rxjs";
import {
  basketArraySelector,
  productsArraySelector,
  selectIsLoadingSelector
} from "../../core/store/app-selectors";
import {TtproductInterface} from "../../shared/types/ttproduct.interface";
import {fetchCategories, fetchProducts} from "../../core/store/app-actions";
import {
  ComponentWithPaginationComponent
} from "../../shared/components/component-with-pagination/component-with-pagination.component";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent extends ComponentWithPaginationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;
  tempArray: TtproductInterface[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
    super();
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.store.dispatch(new fetchProducts());

    if (this.router.url && this.router.url.split('?')[0]) {
      this.baseUrl = this.router.url.split('?')[0];
    }

    this.subscriptions.add(
      this.store.select(basketArraySelector).subscribe(
        (response: TtproductInterface[]) => {
          this.productsInBasket = response;
        }
      )
    );

    this.subscriptions.add(
      this.store.select(selectIsLoadingSelector).pipe(
        delayWhen(IsLoading => !IsLoading ? interval(1500) : of(true))
      ).subscribe(
        (selectIsLoadingSelector: boolean) => {
          this.isLoading = selectIsLoadingSelector;
        }
      )
    );

    this.subscriptions.add(
      this.store.select(productsArraySelector).pipe(
      ).subscribe(
        (response: any) => {
          this.tableData = response;
          this.setPaginationToFirstPageAndPaginate();
        }
      )
    );

    this.subscriptions.add(this.route.queryParams.subscribe(
        (params: Params) => {
          this.currentPage = Number(params['page'] || '1');
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
