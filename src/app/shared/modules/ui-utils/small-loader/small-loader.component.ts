import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-small-loader',
  templateUrl: './small-loader.component.html',
	styleUrls: ['./small-loader.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallLoaderComponent {

  constructor() { }

}
