import * as fromRouter from "@ngrx/router-store";
import {RouterStateUrl} from "../types/routerStateUrl.interface";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

export class CustomSerializer implements fromRouter.RouterReducerState<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {

    const url = routerState.url;
    const queryParams = routerState.root.queryParams;

    let state: ActivatedRouteSnapshot = routerState.root;

    while(state.firstChild) {
      state = state.firstChild;
    }

    const params = state.params;

    return {url, queryParams, params};
  }

  navigationId: number;
  state: RouterStateUrl;
}
