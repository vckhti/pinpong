export enum ActionTypes {
  FETCH_PRODUCTS_START = '[CORE] FETCH_PRODUCTS_START',
  FETCH_PRODUCTS_SUCCESS = '[CORE] FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = '[CORE] FETCH_PRODUCTS_FAILURE',
  CLEAN_PRODUCTS = '[CORE] CLEAN_PRODUCTS',

  LOAD_MORE_PRODUCTS_START = '[CORE] LOAD_MORE_PRODUCTS_START',
  LOAD_MORE_PRODUCTS_SUCCESS = '[CORE] LOAD_MORE_PRODUCTS_SUCCESS',
  LOAD_MORE_PRODUCTS_FAILURE = '[CORE] LOAD_MORE_PRODUCTS_FAILURE',

  FETCH_PRODUCTS_BY_ID_START = '[CORE] FETCH_PRODUCTS_BY_ID_START',
  FETCH_PRODUCTS_BY_ID_SUCCESS = '[CORE] FETCH_PRODUCTS_BY_ID_SUCCESS',
  FETCH_PRODUCTS_BY_ID_FAILURE = '[CORE] FETCH_PRODUCTS_BY_ID_FAILURE',

  ADD_PRODUCT_TO_BASKET = '[CORE] ADD_PRODUCT_TO_BASKET',
  SET_LOADING_INDICATOR = '[CORE] SET_LOADING_INDICATOR',

  SEARCH_PRODUCT = '[CORE] SEARCH_PRODUCT',

  FETCH_CATEGORIES_START = '[CORE] FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = '[CORE] FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE = '[CORE] FETCH_CATEGORIES_FAILURE',
  FETCH_PRODUCTS_BY_CATEGORY = '[CORE] FETCH_PRODUCTS_BY_CATEGORY',

  REMOVE_PRODUCT_FROM_BASKET = '[CORE] REMOVE_PRODUCT_FROM_BASKET',
  DECREMENT_PRODUCT_IN_BASKET = '[CORE] DECREMENT_PRODUCT_FROM_BASKET',

  CLEAN_BASKET = '[CORE] CLEAN_BASKET',

  basketCheckout = '[CORE] BASKET_CHECKOUT'

}
