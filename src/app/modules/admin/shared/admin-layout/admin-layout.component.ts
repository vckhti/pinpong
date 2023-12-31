import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout($event) {
    $event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin','login']);

  }

}
