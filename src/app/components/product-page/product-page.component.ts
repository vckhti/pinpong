import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {catchError, exhaustMap, filter} from 'rxjs/operators';
import {productsArraySelector} from "../../core/store/app-selectors";
import {EMPTY, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {TtproductInterface} from "../../shared/types/ttproduct.interface";
import {Breadcrumb} from "../../shared/modules/ui-utils/breadcrumbs/breadcrumb";
import {AlertService} from "../../shared/services/alert.service";
import {addProductToBasket, setLoadingIndicator} from "../../core/store/app-actions";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    {label: 'Главная', url: '/'},
  ];
  private subscriptions: Subscription;
  product: TtproductInterface;
  productId: number;

  editorStyle = {
    height: '200px'
  };

  constructor(
    private productServ: ProductService,
    private store: Store,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.productId = parseInt(this.route.snapshot.params["id"]);
    this.subscriptions.add(
      this.store.select(productsArraySelector).subscribe(
        (response: TtproductInterface[]) => {
          if (this.productId && response && response.length > 0) {
            this.product = response.find((item: TtproductInterface) => item.id === this.productId);
          }
        }
      )
    );

    this.subscriptions.add(
      this.store.select(productsArraySelector).pipe(
        filter((response) => response === undefined),
        exhaustMap(() => this.productServ.getProducts().pipe(
            catchError((err) => {
              this.alertService.danger(err);
              console.error(err);
              return EMPTY;
            })
          )
        ),
      ).subscribe(
        (response) => {
          if (this.productId) {
            this.product = response.find((item: TtproductInterface) => item.id === this.productId);
          }
        }
      )
    );
  }

  addProduct(product: TtproductInterface) {
    this.store.dispatch(new addProductToBasket({product: product}));
    this.alertService.success(`${product.title} успешно добавлен в корзину!`);
  }

  goBack() {
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    setTimeout(() => this.store.dispatch(new setLoadingIndicator({loading: false})), 1500);
    window.history.back()
  }

}
