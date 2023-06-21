import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {AuthService} from "./services/auth.service";
import {LoginEffect} from "./store/effects/login.effect";
import {LoginComponent} from "./components/login/login.component";
import {GetCurrentUserEffect} from "./store/effects/getCurrentUser.effect";
import {BackendErrorMessagesModule} from "../../shared/modules/backendErrorMessages/backendErrorMessages.module";
import {PersistanceService} from "./services/persistance.service";

const routes = [
   {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([LoginEffect, GetCurrentUserEffect]),
    BackendErrorMessagesModule
  ],
  declarations: [LoginComponent],
  providers: [
    AuthService,
    PersistanceService,
  ],
  exports: [
    LoginComponent,
  ]
})
export class AuthModule {}
