import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-client-cmp',
  templateUrl: 'addUser.component.html',
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;

  constructor(private cls: UsersService, private router: Router) {
    this.addForm = new FormGroup({
      Name: new FormControl(''),
      Email: new FormControl(''),
      Phone: new FormControl(''),
    });
  }

  goBack = () => {
    this.router.navigate(['/users']);
  };

  handleSubmit = async () => {
    const { Name, Email, Phone } = this.addForm.controls;
    if (Name.value.length < 1) {
      alert('Please provide users name');
      return null;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        Email.value
      )
    ) {
      alert('Please Provie a valid Email');
      return null;
    }
    if (isNaN(Phone.value)) {
      alert('Please Provide a valid phone number');
      return null;
    }
    const body = {
      Name: Name.value,
      Email: Email.value,
      Phone: Phone.value,
    };
    try {
      await this.cls.addUser(body);
      alert('User Added succesffully');
      this.goBack();
    } catch (err) {
      console.log('[error] :', err.message);
    }
  };

  ngOnInit() {}
}
