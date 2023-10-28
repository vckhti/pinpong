import {createFeatureSelector, createSelector} from "@ngrx/store";

export const routerReducer = createFeatureSelector<any>
  ('routerReducer');

export const routerReducerState = createSelector(routerReducer, routerReducer => routerReducer.state);

export const selectCurrentRouterReducerParams = createSelector(routerReducerState, routerReducerState => routerReducerState.params?.id);
