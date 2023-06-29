import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {OrdersPageComponent} from './orders-page/orders-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {AuthGuard} from './services/auth.guard';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {UsernamePipe} from "./shared/pipes/username.pipe";
import {FocusDirective} from "./shared/directive/focus.directive";
import {ClickableElementDirective} from "./shared/directive/clickable-element.directive";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    FocusDirective,
    ClickableElementDirective,
    UsernamePipe,
    LoginPageComponent,
    EditPageComponent,
    OrdersPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]},
          {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
        ]
      }
    ])
  ],
  exports: [
    RouterModule],
})

export class AdminModule {

}
