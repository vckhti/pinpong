import {Component, Input} from '@angular/core';
import {TtproductInterface} from "../../types/ttproduct.interface";
import {addProductToBasket} from "../../../core/store/app-actions";
import {Store} from "@ngrx/store";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {
  @Input('item') itemProps: TtproductInterface;
  @Input() productsInBasket: any;

  constructor(private store: Store,
              private alertService: AlertService
  ) {

  }

  public productAlreadyInCart(product: TtproductInterface): boolean {
    if (this.productsInBasket && this.productsInBasket.length > 0) {
      for (let i = 0; i < this.productsInBasket.length; i++) {
        if (this.productsInBasket[i].id === product.id) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  public onAddItemToCart(product: TtproductInterface): void {
    this.store.dispatch(new addProductToBasket({product: product}));
    this.alertService.success(`${product.title} успешно добавлен в корзину!`);
  }

}
