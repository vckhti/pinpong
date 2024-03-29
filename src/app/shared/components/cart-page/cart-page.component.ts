import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {basketArraySelector} from "../../../core/store/app-selectors";
import {TtproductInterface} from "../../types/ttproduct.interface";
import {Subscription} from "rxjs";
import {OrderService} from "../../services/order.service";
import {AlertService} from "../../services/alert.service";
import {
  addProductToBasket,
  cleanBasket,
  decremenProductFromBasket,
  removeProductFromBasket, setLoadingIndicator
} from "../../../core/store/app-actions";
import {Breadcrumb} from "../../modules/ui-utils/breadcrumbs/breadcrumb";
import {currentUserSelector} from "../../../modules/auth/store/selectors";
import {CurrentUserInterface} from "../../../modules/auth/types/currentUser.interface";
import {OrderRequestInteface} from "../../types/order-request.inteface";
import {CustomValidators} from "../../validators";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent implements OnInit, OnDestroy, AfterViewInit {
  breadcrumbs: Breadcrumb[] = [];
  cartProducts: TtproductInterface[] = [];
  uniqueCartProducts: TtproductInterface [] = [];
  totalPrice = 0;
  totalQTY = 0;
  added = '';
  isLoading = true;
  private subscriptions: Subscription;
  showDelivery = false;
  currentUser: CurrentUserInterface;

  form: UntypedFormGroup;
  submitted = false;

  @ViewChildren('name') name: QueryList<ElementRef>
  inputName;

  constructor(
    private productServ: ProductService,
    private orderService: OrderService,
    private store: Store,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscriptions = new Subscription();
    this.initBreadcrumbs();
    this.initFormControls();
  }

  private initBreadcrumbs(): void {
    this.breadcrumbs = [
      {label: 'Главная', url: '/'},
    ];
  }

  private initFormControls(): void {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      phone: new UntypedFormControl(null, [CustomValidators.required, Validators.minLength(16)]),
      address: new UntypedFormControl(null, [CustomValidators.required, Validators.maxLength(35)]),
      payment: new UntypedFormControl('Перевод'),
    });
  }

  ngOnInit(): void  {
    this.initCurrentUserSelectorObserver();
    this.initBasketArraySelectorObserver();
  }

  ngAfterViewInit(): void {
    this.name.changes.subscribe((v) => {
      this.inputName = v.first;
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initCurrentUserSelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(currentUserSelector).pipe(
      ).subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.cdr.detectChanges();
      })
    );
  }

  private initBasketArraySelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(basketArraySelector)
        .subscribe((basket: TtproductInterface[]) => {
          this.cartProducts = basket.sort((a: TtproductInterface, b: TtproductInterface) => {
            if (a.title > b.title) {
              return 1;
            } else if (a.title < b.title) {
              return -1;
            }
            return 0;
          });
          this.calculateProductsQTY();
          this.filterOnlyUniqueProducts();
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }, 1500); // Для прорисовки картинок товаров
        })
    );
  }

  public submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    this.createOrderObserver();
  }

  private createOrderObserver(): void {
    const order: OrderRequestInteface = {
      user_id: this.currentUser?.id ? this.currentUser?.id : 1,
      note: this.form.value.name + '_' + this.form.value.phone + '_' + this.form.value.address + '_' + this.form.value.payment,
      cart_sum: this.totalPrice,
      cart_qty: this.totalQTY,
      orders: this.uniqueCartProducts,
    }
    this.subscriptions.add(
      this.orderService.create(order).subscribe(res => {
        this.form.reset();
        this.added = 'Ваш заказ отправлен в обработку.';
        this.alertService.success('Ваш заказ отправлен в обработку.');
        this.store.dispatch(new cleanBasket());
        this.submitted = false;
        this.cdr.detectChanges();
      })
    );
  }


  private containsObject(obj, list): boolean {
    for (let i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
        return true;
      }
    }

    return false;
  }

  private filterOnlyUniqueProducts(): void {
    this.uniqueCartProducts = [];
    this.uniqueCartProducts.push(this.cartProducts[0]);
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (!this.containsObject(this.cartProducts[i], this.uniqueCartProducts)) {
        this.uniqueCartProducts.push(this.cartProducts[i]);
      }
    }
  }

  private calculateProductsQTY(): void {
    this.totalPrice = 0;
    this.totalQTY = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.cartProducts[i].qty = 0;
      this.totalPrice += this.cartProducts[i].price;
      this.totalQTY = this.cartProducts.length;

      for (let j = 0; j < this.cartProducts.length; j++) {
        if (this.cartProducts[i].id === this.cartProducts[j].id) {
          this.cartProducts[i].qty = this.cartProducts[i].qty + 1;
        }
      }
    }
  }

  public onIncrementProduct(cartProduct: TtproductInterface): void {
    this.store.dispatch(new addProductToBasket({product: cartProduct}));
  }

  public onDecrementProduct(cartProduct: TtproductInterface): void {
    this.store.dispatch(new decremenProductFromBasket({product: cartProduct}));
  }

  public onDeleteProductFromCart(cartProduct: TtproductInterface): void {
    this.store.dispatch(new removeProductFromBasket({product: cartProduct}));
  }

  public onCleanCart(): void {
    this.store.dispatch(new cleanBasket());
  }

  public onPressGoBack(): void {
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    setTimeout(() => {
      this.store.dispatch(new setLoadingIndicator({loading: false}));
      this.cdr.detectChanges();
    }, 1500);
    window.history.back()
  }

  public onCheckout(): void {
    this.showDelivery = !this.showDelivery;
    setTimeout(() => {
      this.inputName.nativeElement.focus();
      this.cdr.detectChanges();
    }, 500);
  }


}
