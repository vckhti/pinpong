import { UntypedFormControl, AbstractControl, ValidatorFn, UntypedFormGroup, ValidationErrors } from '@angular/forms';

export class ValidatorsUtils {

  static addError(control: AbstractControl, errorName: string, errorValue: any = true): void {
    const errors = {
      ...control.errors,
    };
    errors[ errorName ] = errorValue;
    control.setErrors(errors);
  }

  static removeError(control: AbstractControl, errorName: string): void {
    if ( control.errors ){
      delete control.errors[ errorName ];
      if ( Object.keys(control.errors).length === 0 ){
        control.setErrors(null);
      }
    }
  }

  static isEmpty(value: any): boolean{
    return typeof value === 'undefined' || value == null || !value.toString().trim().length;
  }

  static parseDate(value: string): Date|null {
    const parts: number[] = value.split('.').map(part => parseInt(part, 10));

    if ( parts.length ){
      return new Date(parts[2], parts[1], parts[0]);
    } else {
      return null;
    }

  }

}

export class CustomValidators {

  static number(formControl: AbstractControl): ValidationErrors | null {
    const value = formControl.value;

    if ( isNaN( Number(value) ) ) {
      return {
        number: true,
      };
    }

    return null;
  }

  static required(formControl: AbstractControl): ValidationErrors | null {
    if ( !formControl ) { return null; }

    const value = formControl.value;

    return typeof value === 'undefined' || value == null || !value.toString().trim().length
      ? { required: true }
      : null;
  }

  static readableSymbols(formControl: UntypedFormControl): ValidationErrors | null {
    const value: string = formControl.value;
    const regExp = /^[0-9а-яА-Яa-zA-Z\s,()\-+ёЁ.]*$/;

    return !value.match(regExp)
      ? { readableSymbols: true }
      : null;
  }

  static requireCheckboxesToBeChecked(minRequired: number = 1, max: number | null = null): ValidatorFn {
		return function validate(abstractControl: AbstractControl): ValidationErrors | null {
			let checked = 0;
			const formGroup = abstractControl as UntypedFormGroup;

			Object.keys(formGroup.controls).forEach(key => {
				const control = formGroup.controls[key];

				if (control.value === true) {
					checked ++;
				}
			});

			const errors: any = {};

			if ( checked < minRequired ){
			  errors.minCheckboxesChecked = true;
      }

			if ( max !== null && checked > max ) {
        errors.maxCheckboxesChecked = true;
			}

			return Object.keys(errors).length === 0 ? null : errors;
		};
	}

	static ogrn(abstractControl: AbstractControl): ValidationErrors | null {
    const formControl = abstractControl as UntypedFormControl;
    const value: string = formControl.value;

    if ( ValidatorsUtils.isEmpty(value) ) {
      return {};
    }

    let error;

    if ( /[^0-9]/.test(value) || value.length !== 13 ){
      error = true;
    } else {
      const n13 = parseInt((parseInt(value.slice(0, -1), 10) % 11).toString().slice(-1), 10);
      error = n13 !== parseInt(value[12], 10);
    }

    return error ? {ogrn: true} : {};
  }

  static ogrnip(abstractControl: AbstractControl): ValidationErrors | null {
    const formControl = abstractControl as UntypedFormControl;
    const value: string = formControl.value;

    if ( ValidatorsUtils.isEmpty(value) ) {
      return {};
    }

    let error;

    if ( /[^0-9]/.test(value) || value.length !== 15 ){
      error = true;
    } else {
      const n15 = parseInt((parseInt(value.slice(0, -1), 10) % 13).toString().slice(-1), 10);
      error = n15 !== parseInt(value[14], 10);
    }

    return error ? {ogrnip: true} : {};
  }

  static dateRange(formControlStartName: string, formControlEndName: string, maxInterval: number | null = null): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const formGroup = abstractControl as UntypedFormGroup;

      const startControl: UntypedFormControl = formGroup.get(formControlStartName) as UntypedFormControl;
      const endControl: UntypedFormControl = formGroup.get(formControlEndName) as UntypedFormControl;

      const startValue: string = startControl.value;
      const endValue: string = endControl.value;

      let errorDateRange = false;
      let errorMaxInterval = false;

      if ( !ValidatorsUtils.isEmpty(startValue) && !ValidatorsUtils.isEmpty(endValue) ){
        const startDate = ValidatorsUtils.parseDate(startValue);
        const endDate = ValidatorsUtils.parseDate(endValue);

        if ( startDate && endDate ) {
          // Range validation
          if ( endDate.getTime() < startDate.getTime() ){
            errorDateRange = true;
          }

          // Max range validation
          if ( maxInterval !== null ){
            const maxIntervalMills = (maxInterval - 1) * 1000 * 3600 * 24;
            const datesRange = endDate.getTime() - startDate.getTime();

            if ( datesRange > maxIntervalMills ){
              errorMaxInterval = true;
            }
          }
        }
      }

      if ( errorDateRange ){
        ValidatorsUtils.addError(startControl, 'dateRange', true);
        ValidatorsUtils.addError(endControl, 'dateRange', true);
      } else {
        ValidatorsUtils.removeError(startControl, 'dateRange');
        ValidatorsUtils.removeError(endControl, 'dateRange');
      }

      if ( errorMaxInterval ){
        ValidatorsUtils.addError(startControl, 'dateMaxRange', true);
        ValidatorsUtils.addError(endControl, 'dateMaxRange', true);
      } else {
        ValidatorsUtils.removeError(startControl, 'dateMaxRange');
        ValidatorsUtils.removeError(endControl, 'dateMaxRange');
      }

      return {};

    };
  }

  static fileSize(size: number): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const formControl = abstractControl as UntypedFormControl;
      const value: File = formControl.value;

      if ( ValidatorsUtils.isEmpty(value) ){
        return {};
      }

      if ( value.size > size ){
        return {size: true};
      } else {
        return {};
      }

    };
  }

  static fileExtensions(extensions: string[]): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const formControl = abstractControl as UntypedFormControl;
      const value: File = formControl.value;

      if ( ValidatorsUtils.isEmpty(value) ){
        return {};
      }

      const fileNameParts: string[] = value.name.split('.');
      const fileExtension = fileNameParts.length
        ? fileNameParts[ fileNameParts.length - 1 ]
        : null;

      if ( !fileExtension || !extensions.includes(fileExtension) ){
        return {extension: true};
      }

      return {};
    };
  }

}
