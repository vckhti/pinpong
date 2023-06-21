import {createAction, props} from '@ngrx/store'

import {ActionTypes} from "../actionTypes";
import {CurrentUserInterface} from "../../types/currentUser.interface";
import {BackendErrorsInterface} from "../../types/backendErrors.interface";

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{request: any}>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{errors: BackendErrorsInterface}>()
);

export const logOutAction = createAction(
  ActionTypes.LOGOUT
);
