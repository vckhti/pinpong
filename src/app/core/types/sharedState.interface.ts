import {TtproductInterface} from "../../shared/types/ttproduct.interface";
import {CategoryInterface} from "../../shared/types/category.interface";

export interface SharedState {
  isLoading: boolean;
  basket: TtproductInterface[] | undefined;
  categories: CategoryInterface[] | undefined;
  products: TtproductInterface[] | undefined;
}
