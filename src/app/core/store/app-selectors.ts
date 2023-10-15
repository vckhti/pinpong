import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SharedState} from "../types/sharedState.interface";
import {selectCurrentRouterReducerParams} from "./router-selectors";

const selectAppState = createFeatureSelector<SharedState>('app');

export const selectIsLoadingSelector = createSelector(selectAppState, state => state.isLoading);

export const basketArraySelector = createSelector(selectAppState, state => state.basket);

export const basketArraySelectorCount = createSelector(selectAppState, state => state.basket.length);

export const productsArraySelector = createSelector(selectAppState, state => state.products);

export const categoriesArraySelector = createSelector(selectAppState, state => state.categories);

export const selectedProduct = createSelector(
  selectCurrentRouterReducerParams,
  productsArraySelector,
  (currentId, productsArray) => {
    return productsArray?.find(
      product => currentId === product.product_id.toString())
  }
);
