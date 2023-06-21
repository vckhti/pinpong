import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: ['./file-uploader.component.less'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => FileUploaderComponent),
		multi: true,
	}]
})
export class FileUploaderComponent implements ControlValueAccessor {
	
	acceptFormats_?: string;
	acceptFormatsOriginal: string[] = [];
	
	@Input('acceptFormats')
	set acceptFormats(value: string[]) {
		this.acceptFormats_ = value.map(format => '.' + format).join(', ');
		this.acceptFormatsOriginal = value;
	}
	
	get acceptFormats(): string[] {
		return this.acceptFormatsOriginal;
	}
	
	@ViewChild('inputFileElement') inputFileElement?: ElementRef<HTMLInputElement>;
	file: File | null = null;
	fileSize: string | null = null;
	_onChange?: (obj: File | null) => {};
	
	constructor() { }
	
	onUploadButtonClick(): void {
		this.inputFileElement?.nativeElement.click();
	}
	
	onFileSelected(event: Event): void {
		const files = (event.target as HTMLInputElement).files;
		
		if (files?.length) {
			this.file = files.item(0);
		} else {
			this.file = null;
		}
		
		if (this.file) {
			this.fileSize = this.getFormattedSize(this.file.size);
		} else {
			this.fileSize = null;
		}
		
		this._onChange?.(this.file);
	}
	
	registerOnChange(fn: any): void {
		this._onChange = fn;
	}
	
	registerOnTouched(fn: any): void {
	}
	
	setDisabledState(isDisabled: boolean): void {
	}
	
	writeValue(obj: File): void {
		this.file = obj;
	}
	
	getFormattedSize(size: number): string {
		return (Math.round(Math.floor(size / 1024) * 10) / 10).toString() + ' Кб';
	}
	
}
