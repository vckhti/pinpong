import * as fromRouter from "@ngrx/router-store";
import {RouterStateUrl} from "./routerStateUrl.interface";
import {SharedState} from "./sharedState.interface";

export interface AppState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
  app: SharedState
}
