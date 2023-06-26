import {Observable, of} from "rxjs";
import {OrderProductInterface} from "../shared/types/orderProductInterface";
import {UserDescriptionInterface} from "../shared/types/userDescription.interface";
import {OrderInterface} from "../../shared/types/order.interface";

export class EditPageModel {
  orderProductId: number;
  productId: number;

  private _orderProduct: OrderProductInterface;
  private _order: OrderInterface;

  private _usersDecriptions: UserDescriptionInterface[];

  saveOrderProductToModel(response: OrderProductInterface): EditPageModel {
    this._orderProduct = response;

    return this;
  }

  saveOrderByIdToModel(response: OrderInterface): EditPageModel {
    this._order = response;

    return this;
  }

  saveUsersToModel(response: UserDescriptionInterface[]): EditPageModel {
    this._usersDecriptions = response;

    return this;
  }

  saveOrderIdToModel(orderId: string): Observable<EditPageModel> {
    this.orderProductId = parseInt(orderId);

    return of(this);
  }

  saveProductIdToModel(productId: string): Observable<EditPageModel> {
    this.productId = parseInt(productId);

    return of(this);
  }

  getOrderProduct(): OrderProductInterface {
    return this._orderProduct;
  }

  getOrder(): OrderInterface {
    return this._order;
  }

  getUsersDescriptions(): UserDescriptionInterface[] {
    return this._usersDecriptions;
  }

}
