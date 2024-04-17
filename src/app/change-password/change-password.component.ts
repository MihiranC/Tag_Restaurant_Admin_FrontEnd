import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ChangePassword } from '../Models/ChangePasswordModel';
import { ChangePasswordService } from '../Services/ChangePassword.service';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { LoginService } from '../Services/Login.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  
  router: any;

  constructor(
    public ChangePasswordService: ChangePasswordService,
    public LoginService: LoginService,
    public Router: Router

  ) { }

  @ViewChild(FormGroupDirective, { static: false }) ChangePasswordFormDirective: FormGroupDirective | undefined
  ChangePasswordForm: FormGroup | undefined;

  ChangePasswordObject: ChangePassword = new ChangePassword();
  ChangePasswordList: ChangePassword[] | undefined;

  ngOnInit(): void {

    this.ChangePasswordForm = new FormGroup({
      userInput: new FormControl(),

    });

  }

}
