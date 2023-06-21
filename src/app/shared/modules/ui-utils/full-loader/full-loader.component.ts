import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-full-loader',
  templateUrl: './full-loader.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullLoaderComponent {

  constructor() { }

}
