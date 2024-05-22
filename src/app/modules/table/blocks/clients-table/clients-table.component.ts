import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {iUser} from "../../../../data/dto/users.dto";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, FormsModule],
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsTableComponent {
  @Input({required: true}) dataSource!: iUser[] | null;

  @Output() selected = new EventEmitter<iUser[]>();
  @Output() edit = new EventEmitter<iUser>();

  protected readonly displayedColumns = ['name', 'surname', 'email', 'phone'];

  protected selection = new SelectionModel<iUser>(true, []);

  protected isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource!.length;
    return numSelected === numRows;
  }

  protected masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource!.forEach(row => this.selection.select(row));
  }
}
