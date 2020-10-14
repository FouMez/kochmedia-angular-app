import { Injectable } from '@angular/core';
import { API_USERS } from './config';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  async getAllUsers() {
    const res = await axios.get(API_USERS);
    return res.data;
  }

  async addUser(user) {
    const res = await axios.post(API_USERS, user);
    return res.data;
  }

  async updateUser(id, body) {
    const res = await axios.put(`${API_USERS}/${id}`, body);
    return res.data;
  }
  async deleteUser(id) {
    const res = await axios.delete(`${API_USERS}/${id}`);
    return res.data;
  }
}
