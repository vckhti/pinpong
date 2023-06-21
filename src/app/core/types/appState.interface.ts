import {TtproductInterface} from "../../shared/types/ttproduct.interface";
import {CategoryInterface} from "../../shared/types/category.interface";

export interface AppState {
  isLoading: boolean;
  basket: TtproductInterface[];
  categories: CategoryInterface[];
  products: TtproductInterface[];

}
