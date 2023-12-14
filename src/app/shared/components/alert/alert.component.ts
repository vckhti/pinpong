import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Subscription} from 'rxjs';
import {MessageService} from "primeng/api";
import {Message} from "primeng/api/message";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 7000;

  public text: string;
  public type = 'success';

  subscription: Subscription;

  constructor(
    private alertService: AlertService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(
      this.alertService.alert$.subscribe(alert => {
        const message: Message = {
          severity: alert.type,
          detail: alert.text,
        }
        this.messageService.add(message);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeWindow() {
    this.text = '';
  }

}
