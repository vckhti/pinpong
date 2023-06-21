import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	Input,
	OnChanges,
	OnDestroy,
	QueryList,
	SimpleChanges
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';
import { merge, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.less'],
	animations: [
		trigger('error', [
			transition(':enter', [
				style({height: '0px'}),
				animate('0.1s', style({height: '*'})),
			]),
			transition(':leave', [
				animate('0.1s', style({height: '0px'})),
			]),
		]),
	],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class InputErrorsComponent implements OnDestroy, OnChanges {
	@Input() control?: any;
	onDestroy$ = new Subject<boolean>();
	@ContentChildren(InputErrorComponent) inputErrors?: QueryList<InputErrorComponent>;
	errors: string[] = [];
	valueChangesSubscription?: Subscription;

  constructor(private cdr: ChangeDetectorRef) { }

	ngOnDestroy(): void {
		this.onDestroy$.next(true);
	}

	ngOnChanges(changes: SimpleChanges): void {

		setTimeout(() => {
			this.updateErrors();
		});

		// Control value changes subscription
		if (this.control) {
			this.valueChangesSubscription?.unsubscribe();
			this.valueChangesSubscription = merge(
				this.control.valueChanges,
				this.control.statusChanges,
			)
				.pipe(takeUntil(this.onDestroy$))
				.subscribe(() => {
					setTimeout(() => {
						this.updateErrors();
					});
				});
		}

	}

	private updateErrors(): void {
		this.errors = [];

		this.inputErrors?.forEach(errorComponent => {
			const errorType = errorComponent.error;
			const errorText: string|undefined = errorComponent.content?.nativeElement.innerHTML;

			if (errorType !== undefined && Array.isArray(errorType)) {
				// Array type
				const hasError = errorType.filter(error => this.control?.hasError(error)).length > 0;
				if (hasError && errorText !== undefined) {
					this.errors.push(errorText);
				}
			} else {
				// String type
				if (
					errorType !== undefined
					&& errorText !== undefined
					&& this.control?.hasError(errorType)
				) {
					this.errors.push(errorText);
				}
			}
		});

		this.cdr.detectChanges();
	}

}
