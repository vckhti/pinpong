import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.components.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: string

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages[0] = this.backendErrorsProps;
  }
}
