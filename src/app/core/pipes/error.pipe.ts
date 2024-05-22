import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Pipe({
  name: 'error',
  standalone: true
})
export class ErrorPipe implements PipeTransform {

  transform(control: AbstractControl): Observable<string> {
    return control.valueChanges.pipe(
      startWith(control.value),
      map(_ => this.getError(control))
    )
  }

  private getError(control: AbstractControl): string {
    const errors = control.errors;
    let firstError: string = '';
    for (let key in errors) {
      const errText = errors[key];
      if (typeof errText !== 'string') {
        continue;
      }
      firstError = errors[key];
      return firstError;
    }
    return firstError;
  }

}
