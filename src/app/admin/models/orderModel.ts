import {TtproductInterface} from "../../shared/types/ttproduct.interface";
import {UserDescriptionInterface} from "../shared/types/userDescription.interface";

export class OrderModel {
  success: boolean
  errors: any;
  isLoading: boolean;

  private _products: TtproductInterface[] = [];
  private _users: UserDescriptionInterface[] = [];

  constructor() {
  }

  public saveProductsToModel(response: TtproductInterface[]): OrderModel {
    this._products = response;

    return this;
  }

  public saveUsersToModel(response: UserDescriptionInterface[]): OrderModel {
    this._users = response;

    return this;
  }

  public getProducts(): TtproductInterface[] {
    return this._products;
  }

  //TODO переделать возврать значения через pipe, для улучшения производительности.
  getUsernameByIdFromAllUsersDesriptions(id: number | null): string {
    if (id && this._users && this._users.length > 0) {
      for (let i = 0; i < this._users.length; i++) {
        if (this._users[i].id === id) {
          return this._users[i].name;
        }
      }
    }
    return ''
  }

}
