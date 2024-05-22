import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-ui-kit-main-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, NgOptimizedImage, MatCheckboxModule],
  templateUrl: './ui-kit-main-page.component.html',
  styleUrls: ['./ui-kit-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiKitMainPageComponent {

}
