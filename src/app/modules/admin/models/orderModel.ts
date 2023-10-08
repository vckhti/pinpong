import {TtproductInterface} from "../../../shared/types/ttproduct.interface";
import {UserDescriptionInterface} from "../shared/types/userDescription.interface";

export class OrderModel {
  success: boolean
  errors: any;
  isLoading: boolean;

  private _products: TtproductInterface[] = [];
  private _users: UserDescriptionInterface[] = [];

  constructor() {
  }

  saveProductsToModel(response: TtproductInterface[]): OrderModel {
    this._products = response;

    return this;
  }

  saveUsersToModel(response: UserDescriptionInterface[]): OrderModel {
    this._users = response;

    return this;
  }

  getProducts(): TtproductInterface[] {
    return this._products;
  }

  getUsersDescription(): UserDescriptionInterface[] {
    return this._users;
  }

}
