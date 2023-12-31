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
  breadcrumbs: Breadcrumb[] = [
    {label: 'Главная', url: '/'},
  ];
  private subscriptions: Subscription;
  product: TtproductInterface | undefined = undefined;
  productId: number;
  isLoading=true;

  editorStyle = {
    height: '200px'
  };

  constructor(
    private productServ: ProductService,
    private store: Store,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
     this.productId = parseInt(this.route.snapshot.params["id"]);

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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addProduct(product: TtproductInterface) {
    this.store.dispatch(new addProductToBasket({product: product}));
    this.alertService.success(`${product.title} успешно добавлен в корзину!`);
  }

  goBack() {
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    setTimeout(() => {
      this.store.dispatch(new setLoadingIndicator({loading: false}));
      this.cdr.detectChanges();
    }, 1500);
    window.history.back()
  }

}
