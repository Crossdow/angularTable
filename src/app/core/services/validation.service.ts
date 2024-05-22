import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private readonly errors = {
    eMail: 'Некорректный адрес',
    require: 'Обязательное поле',
    phone: 'Некорректный номер телефона',
    minLength(minL: number, actualL: number) {
      return `Минимальное кол-во символов: ${minL}, текущее ${actualL}`
    },
  }

  required = (control: AbstractControl): null | ValidationErrors => {
    return Validators.required(control) === null ? null : {require: this.errors.require};
  }

  minLength = (minLength: number) => (control: AbstractControl) => {
    return control.value?.length < minLength ? {minLength: this.errors.minLength(minLength, control.value?.length)} : null;
  }

  emailValidator = (control: AbstractControl): null | ValidationErrors => {
    return Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')(control) === null ? null : {email: this.errors.eMail};
  }

  phoneValidator = (control: AbstractControl): null | ValidationErrors => {
    return Validators.pattern("\\+[0-9]{11}")(control) === null ? null : { phone: this.errors.phone };
  }

}
