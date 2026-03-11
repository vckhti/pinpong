import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.components.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: string

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages[0] = this.backendErrorsProps;
  }
}
