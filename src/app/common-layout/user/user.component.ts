// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user',
//   standalone: true,
//   imports: [],
//   templateUrl: './user.component.html',
//   styleUrl: './user.component.scss'
// })
// export class UserComponent {

// }



import { Component, NgZone,ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PrimeConfig } from '../../prime.config';

import { UserService } from '../../Services/User.service';
import { Response } from '../../Models/Response';
import { Router } from '@angular/router';
import { MessagesComponent } from '../../messages/messages.component';
import { Login } from '../../Models/LoginModel';
import { Users } from '../../Models/UserModel';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, PrimeConfig, MessagesComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class LoginComponent {

  @ViewChild(FormGroupDirective, { static: false }) UserFormDirective: FormGroupDirective | undefined
  @ViewChild(MessagesComponent) messagesComponent: MessagesComponent | undefined;

  formData: any = {};

  ResponseObj: Response = new Response();
  
  UserObject: Login = new Login()

  UserForm: FormGroup | undefined;

  UserList: Login[] | undefined;

  OperationBtnText: string = 'Add'
  userObject: Users = new Users()
  usersList: Users[] = [];
  userID: number = 1;

  router: any;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    public Router: Router,
    private zone: NgZone
  ) {

    this.UserForm = this.fb.group({
      userID: new FormControl(),
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl(),
      addressLine3: new FormControl(),
      addressLine4: new FormControl(),
      email: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void { 
    this.loadExistingUser();
  }


  //Insert and Update the officer Details.
  onSubmit() {
    this.userObject.username = this.UserForm!.value.username;
    this.userObject.firstName = this.UserForm!.value.firstName;
    this.userObject.lastName = this.UserForm!.value.lastName;
    this.userObject.addressLine1 = this.UserForm!.value.addressLine1;
    this.userObject.addressLine2 = this.UserForm!.value.addressLine2;
    this.userObject.addressLine3 = this.UserForm!.value.addressLine3;
    this.userObject.addressLine4 = this.UserForm!.value.addressLine4;
    this.userObject.mobileNo = this.UserForm!.value.mobileNo;
    this.userObject.email = this.UserForm!.value.email;
    this.userObject.roleCode = 'U';
    if (this.OperationBtnText == "Add") {
      this.userObject.userID = -999;
      this.userService.InsertUsers(this.userObject)
        .subscribe({
          next: (data: any) => {
          if (data.code == "1000") {
            this.messagesComponent!.showSuccess('Successfully inserted')
            this.clearForm();
            this.loadExistingUser();
          }
          else {
            this.messagesComponent!.showError(data.message);
          }
        },
        error: (error: any) => {
          this.messagesComponent?.showError(error);
        },
      });
  }
    // else {

    //   this.userService.UpdateUsers(this.updateDate)
    //   .subscribe(data => {
    //     if (data.code == "1000") {
    //       this.messagesComponent!.showSuccess('Successfully updated')
    //       this.clearForm();
    //       this.loadExistingUser();
    //     }
    //     else {
    //       this.messagesComponent!.showError(data.description)
    //     }
    //   }
    //   );
    // }

  }

  loadExistingUser() {
    this.userService.ReturnUsers(-999,'U').subscribe(response => {
      this.usersList = response.data
      // this.dataSource = new MatTableDataSource(this.usersList);
      // this.dataSource.paginator = this.paginator;
    });
  }

  clearForm() {
    this.UserForm!.reset();
  }
}

