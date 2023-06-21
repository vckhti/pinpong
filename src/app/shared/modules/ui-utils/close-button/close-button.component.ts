import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
	styleUrls: ['./close-button.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseButtonComponent {

  constructor() { }

}
