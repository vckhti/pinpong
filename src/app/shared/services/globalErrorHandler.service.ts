import {ErrorHandler, Injectable} from "@angular/core";
import {AlertService} from "./alert.service";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    private alertService: AlertService
  ) {}

  handleError(error: Error): void {
    this.alertService.danger(error.message);
  }

}
