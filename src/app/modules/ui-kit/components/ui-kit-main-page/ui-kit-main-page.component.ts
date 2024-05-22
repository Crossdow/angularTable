import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-kit-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-kit-main-page.component.html',
  styleUrls: ['./ui-kit-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiKitMainPageComponent {

}
