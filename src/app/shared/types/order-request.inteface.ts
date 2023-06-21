import {TtproductInterface} from "./ttproduct.interface";

export interface OrderRequestInteface {
  cart_qty: number;
  cart_sum: number;
  note: string;
  orders: TtproductInterface[];
  user_id: number;
}
