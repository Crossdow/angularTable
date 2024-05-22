import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ValidationService} from "../../../../core/services/validation.service";
import {ErrorPipe} from "../../../../core/pipes/error.pipe";
import {iUser} from "../../../../data/dto/users.dto";

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, ErrorPipe],
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDialogComponent implements OnInit {
  private readonly _dialogRef: MatDialogRef<AddDialogComponent> = inject(MatDialogRef<AddDialogComponent>);
  private readonly _validationService = inject(ValidationService);
  protected readonly data: {title: string, user: iUser | null} = inject(MAT_DIALOG_DATA);

  protected userForm!: UserFormType;

  ngOnInit() {
    const user = this.data?.user;

    this.userForm = new FormGroup({
      name: new FormControl<string>(user?.name ?? '', {nonNullable: true, validators: [this._validationService.required, this._validationService.minLength(2)]}),
      surname: new FormControl<string>(user?.surname ?? '', {nonNullable: true, validators: [this._validationService.required, this._validationService.minLength(2)]}),
      email: new FormControl<string>(user?.email ?? '', {nonNullable: true, validators: [this._validationService.required, this._validationService.emailValidator]}),
      phone: new FormControl<string>(user?.phone ?? '', {validators: [this._validationService.phoneValidator]})
    });
  }

  protected get disableSaveButton(): boolean {
    return this.userForm.invalid || this.userForm.pristine || (JSON.stringify(this.userForm.getRawValue()) === JSON.stringify(this.data?.user));
  }

  protected close() {
    this._dialogRef.close(this.userForm.getRawValue());
  }
}

type UserFormType = FormGroup<{
  name: FormControl<string>;
  surname: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string | null>;
}>;

