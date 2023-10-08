import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {tap} from 'rxjs/operators'

import {PersistanceService} from 'src/app/modules/auth/services/persistance.service'

import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {
  getCurrentUserAction,
  getCurrentUserFailureAction, getCurrentUserLiteSuccessAction,
} from "../actions/getCurrentUser.action";
import {Store} from "@ngrx/store";
import {logOutAction} from "../actions/login.action";
import {CurrentUserInterface} from "../../types/currentUser.interface";

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getCurrentUserAction),
        tap(() => {
            const email = this.persistanceService.get('email');
            const roles = this.persistanceService.get('roles');
            const user_id = this.persistanceService.get('id');
            const tokenExpire = parseInt(this.persistanceService.get('token-exp'));
            if (tokenExpire && (new Date().getTime() > tokenExpire)) {
              this.store.dispatch(logOutAction());
              this.router.navigateByUrl('login');
              this.store.dispatch(getCurrentUserFailureAction());
            } else {
              if (tokenExpire && (new Date().getTime() < tokenExpire) && email && user_id) {
                let currentUser: CurrentUserInterface = {
                  id: user_id,
                  username: email.split('@')[0],
                  email: email,
                  firstName: '',
                  lastName: '',
                  roles: roles.split(',')
                }
                this.store.dispatch(getCurrentUserLiteSuccessAction({currentUser: currentUser}));
              }
            }
            return null;
          }
        )
      ),
    {
      dispatch: false
    }
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router,
    private store: Store
  ) {
  }
}
