import { Component, ViewChild } from '@angular/core';
import { Accounts, Notes } from '../../Models/Demo';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { PrimeConfig } from '../../prime.config';
import { AccountService } from '../../Services/Account.service';
import { AllAccountSummery } from '../../Models/AccountDetails';
import { EncryptionService } from '../../Services/encryption.service';
import { error } from 'console';
import { MessagesComponent } from '../../messages/messages.component';
import { UserService } from '../../Services/User.service';
import { Users } from '../../Models/UserModel';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, PrimeConfig, MessagesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(
    public UserService: UserService,    
  ) { }
  
  @ViewChild(MessagesComponent) messagesComponent: MessagesComponent | undefined;
  @ViewChild('dt2') dt2: Table | undefined;; // Assuming dt2 is a PrimeNG Table reference
  Users : Users[] = []

  ngOnInit() {
    this.SelectUsers();
  };


  SelectUsers(){
    this.UserService.ReturnUsers(-999,'U')
    .subscribe({
      next: (data: any) => {
        if (data.code == "1000") {
          this.Users = data.data
        } else {
          this.messagesComponent?.showError(data.message);
        }
      },
      error: (error: any) => {
        this.messagesComponent?.showError(error);
      },
    });
  }

  onFilterGlobal(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.dt2) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

}


