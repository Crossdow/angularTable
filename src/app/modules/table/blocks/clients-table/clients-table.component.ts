import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {iUser} from "../../../../data/dto/users.dto";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSortModule, Sort} from "@angular/material/sort";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, FormsModule, MatSortModule],
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsTableComponent {
  @Input({required: true})
  set dataSource(value: iUser[] | null) {
    if (!value) return;
    this.sortedData$.next(value);
    this.initialData = value;
  };

  @Output() selected = new EventEmitter<iUser[]>();
  @Output() edit = new EventEmitter<iUser>();

  private initialData: iUser[] = [];
  protected readonly sortedData$ = new BehaviorSubject<iUser[]>([]);

  protected readonly displayedColumns = ['name', 'surname', 'email', 'phone'];

  protected selection = new SelectionModel<iUser>(true, []);

  protected isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.sortedData$.getValue().length;
    return numSelected === numRows;
  }

  protected masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.sortedData$.getValue().forEach(row => this.selection.select(row));
  }

  protected sortData(sort: Sort) {
    const sortedData = this.sortedData$.getValue();
    if (!sortedData) return;

    const data = sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData$.next(this.initialData)
      return;
    }

    this.sortedData$.next(data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'surname':
          return compare(a.surname, b.surname, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'phone':
          return compare(a.phone, b.phone, isAsc);
        default:
          return 0;
      }
    }));
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


