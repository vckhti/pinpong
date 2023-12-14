import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getCurrentUserAction} from "./modules/auth/store/actions/getCurrentUser.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Shop';

  constructor(
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }
}
