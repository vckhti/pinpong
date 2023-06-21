import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	OnDestroy,
	QueryList
} from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';

import { AccordionGroupComponent } from './accordion-group/accordion-group.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-utils-accordion',
  templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements AfterContentInit, OnDestroy {

	@ContentChildren(AccordionGroupComponent)
	groups?: QueryList<AccordionGroupComponent>;
	onDestroy$ = new Subject<boolean>();
	toggleSubscription?: Subscription;

  constructor() { }

	ngOnDestroy(): void {
		this.onDestroy$.next(true);
		this.toggleSubscription?.unsubscribe();
	}

  ngAfterContentInit(): void {

  	this.subscribeOnClicks();

  	this.groups?.changes
			.pipe(takeUntil(this.onDestroy$))
			.subscribe(() => {
				this.subscribeOnClicks();
			});

	}

	subscribeOnClicks(): void {
		const emits = this.groups?.map(group => group.toggle) ?? [];

		this.toggleSubscription?.unsubscribe();
		this.toggleSubscription = merge(...emits)
			.subscribe(group => {
				if (group) {
					if (group.isOpened) {
						group.close();
					} else {
						this.openGroup(group);
					}
				}
			});
	}

	openGroup(group: AccordionGroupComponent): void {
    this.groups?.map(item => item.close());
 		group.open();
	}

}
