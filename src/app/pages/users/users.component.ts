import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'users-cmp',
  templateUrl: 'users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public tableData: Array<User>;
  rowToEdit: User = null;
  rowToConsult: User = null;
  selectedRows: any = {}

  constructor(private us: UsersService, private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      const res = await this.us.getAllUsers();
      this.tableData = res.data;
    } catch (err) {
      alert('ERROR : Could not fetch resources.');
      console.log('[error] :', err.message);
    }
  };

  isEditable = (id: string): Boolean => this.rowToEdit && (this.rowToEdit._id === id);
  isSelected = (id: string) => this.selectedRows[id]

  onRowClick = (id: string) => {
    if (this.isSelected(id)) {
      console.log('cancelling')
      delete this.selectedRows[id];
    } else {
      if (!this.isEditable(id))
      this.selectedRows[id] = true;
    }
  }

  handleEdit = (user: User) => {
    this.rowToEdit = user;
  };

  // REVIEW This is a bad approach but i was not able to do better for the moment.
  onCancel = () => {
    this.getUsers();
    this.handleEdit(null);
  };

  handleAdd = () => {
    this.router.navigate(['users-add']);
  };

  handleConsult = (user: User) => {
    this.rowToConsult = user
  };

  handleDelete = async (id: string) => {
    try {
      await this.us.deleteUser(id);
      alert('User deleted successfully');
      this.getUsers();
    } catch (err) {
      console.log('[error] :', err.message);
    }
  };

  onEditSave = async (user) => {

  const Name =  (<HTMLInputElement>document.getElementById(`Name-${user._id}`)).value;
  const Email =  (<HTMLInputElement>document.getElementById(`Email-${user._id}`)).value;
  const Phone =  (<HTMLInputElement>document.getElementById(`Phone-${user._id}`)).value;
  if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(Email)) {
    alert('Please enter a valid email');
    return;
  }
  if (Number.isNaN(Number(Phone))) {
    alert ('Please enter a valid phone number')
    return;
  }
    try {
      this.us.updateUser(user._id, { Name, Email, Phone });
      this.handleEdit(null);
      alert('User updated succesfully');
    } catch (error) {
      alert('An error has occured, Please retry again.');
      this.onCancel();
    }
  };
}
