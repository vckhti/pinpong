import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {catchError, exhaustMap, filter} from 'rxjs/operators';
import {productsArraySelector, selectedProduct} from "../../../core/store/app-selectors";
import { of, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {TtproductInterface} from "../../types/ttproduct.interface";
import {Breadcrumb} from "../../modules/ui-utils/breadcrumbs/breadcrumb";
import {AlertService} from "../../services/alert.service";
import {addProductToBasket, setLoadingIndicator} from "../../../core/store/app-actions";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit,OnDestroy {
  breadcrumbs: Breadcrumb[] = [{label: 'Главная', url: '/'}];
  product: TtproductInterface | undefined = undefined;
  productId: number;
  isLoading = true;

  private subscriptions: Subscription;

  constructor(
    private productServ: ProductService,
    private store: Store,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscriptions = new Subscription();
    this.initProductId();
  }

  private initProductId(): void {
    this.productId = parseInt(this.route.snapshot.params["id"]);
  }

  ngOnInit() {
    this.initSelectedProductObserver();
    this.initProductsArraySelectorObserver();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initSelectedProductObserver(): void {
    this.subscriptions.add(
      this.store.select(selectedProduct).pipe(
        filter(res => res !== undefined),
      ).subscribe(
        (response) => {
          this.isLoading = false;
          this.product = response;
          this.cdr.detectChanges();
        }
      )
    );
  }

  private initProductsArraySelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(productsArraySelector).pipe(
        filter((response) => (response === undefined || this.product === undefined)),
        exhaustMap(() => this.productServ.getProducts().pipe(
            catchError((err) => {
              this.alertService.danger(err);
              console.error(err);
              return of(null);
            })
          )
        ),
      ).subscribe(
        (response) => {
          this.isLoading = false;
          if (this.productId && response && response.length > 0) {
            this.product = response.find((item: TtproductInterface) => item.id === this.productId);
            this.cdr.detectChanges();
          }
        }
      )
    );
  }

  public onAddProduct(product: TtproductInterface): void {
    this.store.dispatch(new addProductToBasket({product: product}));
    this.alertService.success(`${product.title} успешно добавлен в корзину!`);
  }

  public onPressGoBack(): void {
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    window.history.back();

    setTimeout(() => {
      this.store.dispatch(new setLoadingIndicator({loading: false}));
    }, 1500);

  }

}
