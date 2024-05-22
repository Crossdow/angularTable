export interface iUser {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface iUsersDTO {
  users: iUser[];
}
