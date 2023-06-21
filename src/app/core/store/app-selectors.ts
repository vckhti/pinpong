import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../types/appState.interface";

const selectAppState = createFeatureSelector<AppState>('app');

export const selectIsLoadingSelector = createSelector(selectAppState, state => state.isLoading);

export const basketArraySelector = createSelector(selectAppState, state => state.basket);

export const basketArraySelectorCount = createSelector(selectAppState, state => state.basket.length);

export const productsArraySelector = createSelector(selectAppState, state => state.products);

export const categoriesArraySelector = createSelector(selectAppState, state => state.categories);
