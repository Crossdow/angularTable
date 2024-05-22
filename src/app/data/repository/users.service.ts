import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {iUsersDTO} from "../dto/users.dto";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _http = inject(HttpClient);

  private readonly HOST: string = 'https://test-data.directorix.cloud';

  public getUsers(): Observable<iUsersDTO> {
    return this._http.get<iUsersDTO>(`${this.HOST}/task1`);
  }
}
