import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {AuthService} from 'src/app/modules/admin/services/auth.service';
import {Router} from '@angular/router';
import {AuthUserInterface} from '../shared/types/authUser.interface';
import {Subscription} from "rxjs";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  submitted = false;

  private subscriptions: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscriptions = new Subscription();
    this.initFormControls();
  }

  private initFormControls(): void {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6), Validators.min(1)]),
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: AuthUserInterface = {
      name: this.form.value.name,
      password: this.form.value.password,
    }
    this.subscriptions.add(
      this.auth.login(user).subscribe((user: any) => {
        if (user && user.id && user.roles[0] === 'admin') {
          this.auth.setToken({token: 'admin-token'});
          this.router.navigate(['/admin', 'orders']);
        } else {
          this.form.controls.password.setErrors({min: 'Неверный пароль'})
          this.alert.danger('Введите учетную запись с правами администратора!');
          this.cdr.detectChanges();
          setTimeout(() => {
            this.form.reset();
            this.submitted = false;
            this.cdr.detectChanges();
          }, 2000);
        }
      })
    );
  }

}
