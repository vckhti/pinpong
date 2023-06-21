import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	Output,
	TemplateRef
} from '@angular/core';
import { animate, state, style, transition, trigger, } from '@angular/animations';

@Component({
  selector: 'ui-utils-accordion-group',
  templateUrl: './accordion-group.component.html',
	styleUrls: ['./accordion-group.component.less'],
	animations: [
		trigger('closeOpen', [
			transition(':enter', [
				style({
					height: '0px',
					'padding-bottom': '0px',
				}),
				animate(200, style({
					height: '*',
					'padding-bottom': '*',
				}))
			]),
			
			transition(':leave', [
				animate(200, style({
					height: '0px',
					'padding-bottom': '0px',
				}))
			]),
		])
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionGroupComponent {

	@Input('groupTitle') title?: string;
	@Input('groupSubtitle') subtitle?: string;
	@Input('head') head?: TemplateRef<any>;
	@Input('pointerCursor') pointerCursor = true;
	@Output('toggle') toggle = new EventEmitter<AccordionGroupComponent>();
	
	isOpened = false;
	
  constructor(private cdr: ChangeDetectorRef) { }
  
  click(): void {
  	this.toggle.emit(this);
	}
	
	open(): void {
		this.isOpened = true;
		this.cdr.detectChanges();
	}
	
	close(): void {
		this.isOpened = false;
		this.cdr.detectChanges();
	}

}
