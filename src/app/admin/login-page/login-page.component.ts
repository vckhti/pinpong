import {Component, OnDestroy, OnInit} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/admin/services/auth.service';
import { Router } from '@angular/router';
import {AuthUserInterface} from '../shared/types/authUser.interface';
import {Subscription} from "rxjs";
import {CurrentUserInterface} from "../shared/types/currentUser.interface";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  submitted = false;
  subscriptions: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService

  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)]),
     })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  submit() {
    if (  this.form.invalid ) {
      return;
    }

    this.submitted = true;

    const user: AuthUserInterface = {
      name: this.form.value.name,
      password: this.form.value.password,
    }
    this.subscriptions.add(
    this.auth.login(user).subscribe( (user: CurrentUserInterface) => {
      if (user && user.id && user.roles[0] === 'admin') {
      this.auth.setToken({token: 'admin-token'});
      this.form.reset;
      this.router.navigate(['/admin','orders']);
      this.submitted = false;
      } else {
        this.alert.danger('Введите учетную запись с правами администратора!');
        setTimeout(() => location.reload(),1000);
      }
    }, () => {
      this.submitted = false;
    })
    );

  }

}
