import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-main-page.component.html',
  styleUrls: ['./table-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableMainPageComponent {

}
