import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ClientsTableComponent} from "../../blocks/clients-table/clients-table.component";
import {MatIconModule} from "@angular/material/icon";
import {TableService} from "../../services/table.service";
import {BehaviorSubject, filter} from "rxjs";
import {iUser} from "../../../../data/dto/users.dto";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-table-main-page',
  standalone: true,
  imports: [CommonModule, ClientsTableComponent, MatIconModule, NgOptimizedImage, MatButtonModule],
  templateUrl: './table-main-page.component.html',
  styleUrls: ['./table-main-page.component.scss'],
  providers: [TableService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableMainPageComponent {
  private readonly tableService = inject(TableService);

  protected readonly users$ = this.tableService.tableData$.asObservable().pipe(filter(users =>!!users));
  protected selectedUsers$= new BehaviorSubject<iUser[]>([]);

  protected openAddModal(editUser?: iUser) {
    this.tableService.openAddModal(editUser);
  }

  protected openDeleteModal() {
    this.tableService.openDeleteModal(this.selectedUsers$.getValue());
  }
}
