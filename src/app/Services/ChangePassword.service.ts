
import { Component } from "@angular/core";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword } from "../Models/ChangePasswordModel";
import { UpdateData } from "../Models/UpdateData";
import { HttpService } from "./Http.service";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  ChangePassword: ChangePassword[] | undefined;


  constructor(
    private HttpService: HttpService
  ) { }



ChangePasswordForUserRequest(userInput: string ): Observable<any> {
  return this.HttpService.getData('api/TGAdmin/Login/Update/UserChangePassword',`userInput=${userInput}`)
}

}
