import { Routes } from '@angular/router';

import { UsersComponent } from '../../pages/users/users.component';
import { AddUserComponent } from '../../pages/users/add/addUser.component';

export const AdminLayoutRoutes: Routes = [
    { path: '',   redirectTo: '/users', pathMatch: 'full' },
    { path: 'users',         component: UsersComponent},
    { path: 'users-add',         component: AddUserComponent},
];
