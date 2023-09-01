import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/Models/register.model';
import { AccountServiceService } from 'src/app/Service/account-service.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserRequest:Register={
    username: '',
    email:'',
    phone: 0,
    password: '',
    confirmPassword: ''
  }
  validForm:boolean=true;
  constructor(private accountService:AccountServiceService, private router:Router){}
  ngOnInit(): void {
  }

  registerUser(){
    if (this.registerUserRequest.password!=this.registerUserRequest.confirmPassword || !this.validEmail() || this.registerUserRequest.username=='' ||
    this.registerUserRequest.email=='' || this.registerUserRequest.phone==0 || this.registerUserRequest.password=='' ||
    this.registerUserRequest.confirmPassword=='') {
      alert("Please fill the details correctly");
    }
    else{
      console.log(this.registerUserRequest);
      this.accountService.registerUser(this.registerUserRequest).subscribe({
        next:(response)=>{
          console.log(response);
          console.log(this.registerUserRequest);
          if(!response){
            alert("Error: Email address already exists!");
          }
          else{
            alert("Registration successful!")
            this.router.navigate(['/login']);
          }
        },
        error:(response)=>{
          console.log(response);
        }
      });
    }
  }
  validEmail(): boolean {
    // Regular expression pattern for email validation
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerUserRequest.email)) {
      return false;
    }
    this.validForm=true;
    return true;;
  }
  isPasswordStrong(): boolean {
    if (this.registerUserRequest.password.length < 8) {
      return false;
    }
    if (!/[A-Z]/.test(this.registerUserRequest.password)) {
      return false;
    }
    if (!/[a-z]/.test(this.registerUserRequest.password)) {
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.registerUserRequest.password)) {
      return false;
    }
    if (!/\d/.test(this.registerUserRequest.password)) {
      return false;
    }
    return true;
  }
}
