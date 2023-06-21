import { AppActions} from "./app-actions";
import {ActionTypes} from "./app-actionTypes";
import * as R from 'ramda';
import {TtproductInterface} from "../../shared/types/ttproduct.interface";
import {AppState} from "../types/appState.interface";



const initialState: AppState = {
  isLoading: false,
  basket: [],
  categories: undefined,
  products: undefined
}

export function reducers(state: AppState = initialState, action: AppActions) {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT_TO_BASKET:
      return ({
        ...state,
        basket: state.basket.concat(action.payload.product)
      })

    case ActionTypes.DECREMENT_PRODUCT_IN_BASKET:
      const index: number = state.basket.findIndex((item: TtproductInterface) => item.id === action.payload.product.id);
      if (index !== -1) {
        var result = R.remove(index,1, state.basket)

      }
      return ({
        ...state,
        basket: [...result]
      })

    case ActionTypes.REMOVE_PRODUCT_FROM_BASKET:
      return ({
        ...state,
        basket: state.basket.filter((item: TtproductInterface) => item.id != action.payload.product.id)
      })

    case ActionTypes.CLEAN_BASKET:
      return ({
        ...state,
        basket: []
      })

    case ActionTypes.FETCH_CATEGORIES_SUCCESS:
      return ({
        ...state,
        categories: action.payload.categories,
      })

    case ActionTypes.FETCH_PRODUCTS_START:
      return ({
        ...state,
        isLoading: true,
      })

    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      return ({
        ...state,
        isLoading: false,
        products: action.payload.products,
      })

    case ActionTypes.FETCH_CATEGORIES_START:
      return ({
        ...state,
      })

    case ActionTypes.SET_LOADING_INDICATOR:
      return ({
        ...state,
        isLoading: action.payload.loading
      })

    case ActionTypes.CLEAN_PRODUCTS:
      return ({
        ...state,
        products: [],
      })

    case ActionTypes.FETCH_PRODUCTS_BY_CATEGORY:
      return ({
        ...state,
        isLoading: true,
      })

    default:
      return state
  }
}
