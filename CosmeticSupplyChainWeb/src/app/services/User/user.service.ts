import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AddUsers} from '../../model/AddUsers'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

apiUrl = 'http://localhost:5000/users';

loginUser(email: string, password: string) {
  return this.http.post(`${this.apiUrl}/login`, { email, password });
}

addUser(addUser: AddUsers, token: string) {
  const headers = { 'Authorization': `${token}` };
  return this.http.post(`${this.apiUrl}/add`, addUser, { headers });
}
VerifyToken(token: string) {
  const headers = { 'Authorization': token };
  return this.http.get(`${this.apiUrl}/verify-token`, { headers });
}
Profile(token: string) {
  const headers = { 'Authorization': token };
  return this.http.get(`${this.apiUrl}/profile`, { headers });}

getUsers(token: string) {
  const headers = { 'Authorization': token };
  return this.http.get(`${this.apiUrl}/get-users`, { headers });
}

getUserById(id: string, token: string) {
  const headers = { 'Authorization': token };
  return this.http.get(`${this.apiUrl}/${id}`, { headers });
}


//updateUserRole(id: string, role: string, token: string) the role is needed in the body request
updateUserRole(user_id: string, role: string, token: string) {
  const headers = { 'Authorization': token };
  const body = { user_id, role }; // This creates { "user_id": user_id, "role": role }
  return this.http.put(`${this.apiUrl}/update-role`, body, { headers });
}

updateUserPassword(new_password: string, token: string) {
  const headers = { 'Authorization': token };
  return this.http.put(`${this.apiUrl}/update-password`, { new_password }, { headers });
}
}