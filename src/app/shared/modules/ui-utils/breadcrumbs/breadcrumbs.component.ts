import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Breadcrumb } from './breadcrumb';

@Component({
  selector: 'ui-utils-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {

	@Input() breadcrumbs?: Breadcrumb[];

  constructor() { }

}
