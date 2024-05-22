import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../modals/delete-dialog/delete-dialog.component";
import {AddDialogComponent} from "../modals/add-dialog/add-dialog.component";
import {UsersService} from "../../../data/repository/users.service";
import {iUser} from "../../../data/dto/users.dto";
import {LocalStorageService} from "../../../core/services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private readonly dialog = inject(MatDialog);
  private readonly usersService = inject(UsersService);
  private readonly localStorageService = inject(LocalStorageService);

  public readonly tableData$ = new BehaviorSubject<iUser[]>([]);

  constructor() {
    const localData = this.localStorageService.getData('users');
    if (!localData) {
      this.getData()
    } else {
      this.tableData$.next(JSON.parse(localData));
    }
  }

  private getData() {
    this.usersService.getUsers().pipe(
      map(res => res.users)
    ).subscribe((data) => {
      this.saveData(data);
    });
  }

  private saveData(data: iUser[]) {
    this.localStorageService.saveData('users', JSON.stringify(data));
    this.tableData$.next(data);
  }

  public openAddModal(user?: iUser) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      panelClass: ['initium-dialog'],
      data: {
        title: user ? 'Редактирование' : 'Новый клиент',
        user: user ? user : null,
      },
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe((data: iUser) => {
      if (!data) return;

      const userData = this.localStorageService.getData('users');
      let localData = userData ? JSON.parse(userData) : [];

      const index = localData.findIndex((user: iUser) => user.email === data.email);

      if (index !== -1) {
        localData[index] = data;
        this.saveData(localData);
      } else {
        localData.push(data);
        this.saveData(localData);
      }
    })
  }

  public openDeleteModal(users: iUser[]) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        amount: users.length,
      },
      panelClass: ['initium-dialog'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;

      const userData = this.localStorageService.getData('users');
      const localData = userData ? JSON.parse(userData) : [];

      const updatedUsers = localData.filter((user: iUser) => !users.some(selectedUser => selectedUser.email === user.email));

      this.saveData(updatedUsers);
    });
  }
}
