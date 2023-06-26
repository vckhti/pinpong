import {Observable, of} from "rxjs";
import {OrderProductInterface} from "../shared/types/orderProductInterface";
import {UserDescriptionInterface} from "../shared/types/userDescription.interface";
import {OrderInterface} from "../../shared/types/order.interface";

export class EditPageModel {
  orderProductId: number;
  productId: number;
  usersDecriptions: UserDescriptionInterface[];
  orderProduct: OrderProductInterface;
  order: OrderInterface;

  public saveOrderProductToModel(response: OrderProductInterface): EditPageModel {
    this.orderProduct = response;

    return this;
  }

  public saveOrderByIdToModel(response: OrderInterface): EditPageModel {
    this.order = response;

    return this;
  }

  public saveUsersToModel(response: UserDescriptionInterface[]): EditPageModel {
    this.usersDecriptions = response;

    return this;
  }

  public saveOrderIdToModel(orderId: string): Observable<EditPageModel> {
    this.orderProductId = parseInt(orderId);

    return of(this);
  }

  public saveProductIdToModel(productId: string): Observable<EditPageModel> {
    this.productId = parseInt(productId);

    return of(this);
  }

  public getOrderProduct(): OrderProductInterface {
    return this.orderProduct;
  }

  public getOrder(): OrderInterface {
    return this.order;
  }

  //TODO переделать возврать значения через pipe, для улучшения производительности.
  getUsernameByIdFromAllUsersDescriptions(id: number | null): string {
    if (id && this.usersDecriptions && this.usersDecriptions.length > 0) {
      for (let i = 0; i < this.usersDecriptions.length; i++) {
        if (this.usersDecriptions[i].id === id) {
          return this.usersDecriptions[i].name;
        }
      }
    }
    return ''
  }

}
