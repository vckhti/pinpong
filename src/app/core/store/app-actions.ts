import {ActionTypes} from "./app-actionTypes";
import {Action} from "@ngrx/store";
import {TtproductInterface} from "../../shared/types/ttproduct.interface";
import {CategoryInterface} from "../../shared/types/category.interface";


export class setLoadingIndicator implements Action {
  readonly type = ActionTypes.SET_LOADING_INDICATOR;

  constructor(public payload: { loading: boolean }) {
  }
}

export class addProductToBasket implements Action {
  readonly type = ActionTypes.ADD_PRODUCT_TO_BASKET;

  constructor(public payload: { product: TtproductInterface }) {
  }
}

export class searchProduct implements Action {
  readonly type = ActionTypes.SEARCH_PRODUCT;

  constructor(public payload: { text: string }) {
  }
}

export class removeProductFromBasket implements Action {
  readonly type = ActionTypes.REMOVE_PRODUCT_FROM_BASKET;

  constructor(public payload: { product: TtproductInterface }) {
  }
}

export class decremenProductFromBasket implements Action {
  readonly type = ActionTypes.DECREMENT_PRODUCT_IN_BASKET;

  constructor(public payload: { product: TtproductInterface }) {
  }
}

export class cleanBasket implements Action {
  readonly type = ActionTypes.CLEAN_BASKET;
}

export class basketCheckout implements Action {
  readonly type = ActionTypes.basketCheckout;
}

export class fetchProducts implements Action {
  readonly type = ActionTypes.FETCH_PRODUCTS_START;
}

export class cleanProducts implements Action {
  readonly type = ActionTypes.CLEAN_PRODUCTS;
}

export class fetchProductsSuccess implements Action {
  readonly type = ActionTypes.FETCH_PRODUCTS_SUCCESS;

  constructor(public payload: { products: TtproductInterface[] | [] }) {
  }
}

export class fetchProductsFailure implements Action {
    readonly type = ActionTypes.FETCH_PRODUCTS_FAILURE;
    constructor(public payload: {err: any}) {}
}


export class fetchProductByIdFailure implements Action {
  readonly type = ActionTypes.FETCH_PRODUCTS_BY_ID_FAILURE;
    constructor(public payload: {err: any}) {}
}

export class fetchCategories implements Action {
  readonly type = ActionTypes.FETCH_CATEGORIES_START;
}

export class fetchCategoriesSuccess implements Action {
  readonly type = ActionTypes.FETCH_CATEGORIES_SUCCESS;
  constructor(public payload: {categories: CategoryInterface[]}){}
}

export class fetchCategoriesFailure implements Action {
    readonly type = ActionTypes.FETCH_CATEGORIES_FAILURE;
    constructor(public payload: {err: any}){}
}

export class fetchProductsByCategory implements Action {
  readonly type = ActionTypes.FETCH_PRODUCTS_BY_CATEGORY;
  constructor(public payload: {id: number}){}
}

export type AppActions =
  addProductToBasket |
  searchProduct |
  removeProductFromBasket |
  cleanBasket |
  fetchProducts |
  fetchProductsSuccess |
  fetchProductsFailure |
  fetchProductByIdFailure |
  fetchCategories |
  fetchCategoriesSuccess |
  fetchProductsByCategory |
  cleanProducts |
  setLoadingIndicator |
  decremenProductFromBasket |
  fetchCategoriesFailure;
