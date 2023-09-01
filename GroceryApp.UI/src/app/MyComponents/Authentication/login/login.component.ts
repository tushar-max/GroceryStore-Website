import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/Models/login.model';
import { LoginStatus } from 'src/app/Models/loginStatus.model';
import { AccountServiceService } from 'src/app/Service/account-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUserRequest:LoginModel={
    email: '',
    password: ''
  }
  loginStatus:LoginStatus={
    userName: '',
    email: '',
    loggedIn: false,
    isAdmin: false
  };
  constructor(private accountService:AccountServiceService,private router:Router){}
  loginUser(){
    this.accountService.loginUser(this.loginUserRequest).subscribe({
      next:(response)=>{
        console.log(response);
        if (!response.loggedIn) {
          alert("Invalid Credentials!\n Please enter details correctly.")
        }
        else{
          this.accountService.setUserName(response.userName);
          this.accountService.setUserEmail(response.email);
          this.accountService.setUserLoggedInStatus(response.loggedIn.toString());
          this.accountService.setAdminStatus(response.isAdmin.toString());
          console.log(this.accountService.getUserName());
          console.log(this.accountService.isLoggedIn());
          console.log(this.accountService.isAdmin());
          this.router.navigate(['']);
        }
        // this.loginStatus=response;
      },
      error:(response)=>{
        console.log(response);
      }
    });
  }

  validEmail(): boolean {
    // Regular expression pattern for email validation
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.loginUserRequest.email)) {
      return false;
    }
    return true;;
  }
}
