import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../Models/register.model';
import { LoginModel } from '../Models/login.model';
import { LoginStatus } from '../Models/loginStatus.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'oidc-client';
import { PlacedOrders } from '../Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http:HttpClient,private jwt:JwtHelperService) { }
  baseApiUrl:string=environment.baseApiUrl;
  validRegistration:boolean=false;
  token:string='';
  registerUser(registerUserRequest:Register):Observable<boolean>{
    return this.http.post<boolean>(this.baseApiUrl+'/api/Account',registerUserRequest);
  }

  // loginUser(loginUserRequest:LoginModel):Observable<string>{
  //   return this.http.post<string>(this.baseApiUrl+'/api/Login',loginUserRequest);
  // }

  loginUser(loginUserRequest:LoginModel):Observable<LoginStatus>{
    return this.http.post<LoginStatus>(this.baseApiUrl+'/api/Login',loginUserRequest);
  }
  // getUser():User{
  //   let token = this.jwt.decodeToken();
  //   let user:User={
  //     userName:token.userName,
  //     email:token.email,
  //     loggedIn:token.loggedIn,
  //     isAdmin:token.isAdmin
  //     };
  //     return user;
  //   }
  // }
  setUserName(token:string){
    localStorage.setItem('user',token);
  }
  setUserEmail(token:string){
    localStorage.setItem('email',token);
  }
  setUserLoggedInStatus(token:string){
    localStorage.setItem('loggedIn',token);
  }
  setAdminStatus(token:string){
    localStorage.setItem('isAdmin',token);
  }
  isAdmin(){
    return localStorage.getItem('isAdmin');
  }
  getUserName(){
    return localStorage.getItem('user');
  }
  getUserEmail(){
    return localStorage.getItem('email');
  }
  isLoggedIn(){
    return localStorage.getItem('user')?true:false;
  }
  logoutUser(){
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('isAdmin');
  }
}
