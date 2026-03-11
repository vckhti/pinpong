import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {OrdersPageComponent} from './components/orders-page/orders-page.component';
import {EditPageComponent} from './components/edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {AuthGuard} from './services/auth.guard';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {UsernamePipe} from "./pipes/username.pipe";
import {FocusDirective} from "./directives/focus.directive";
import {HighlightDirective} from "./directives/highlight.directive";
import {LoadingModule} from "../../shared/modules/loading/loading.module";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    FocusDirective,
    HighlightDirective,
    UsernamePipe,
    LoginPageComponent,
    EditPageComponent,
    OrdersPageComponent,
  ],
  imports: [
    CommonModule,
    LoadingModule,
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
