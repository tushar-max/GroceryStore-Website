import { Component } from '@angular/core';
import { AccountServiceService } from '../Service/account-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  constructor(private accountService:AccountServiceService){}
  name:any;
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  isLoggedIn(){
    if (this.accountService.isLoggedIn()) {
      this.name=this.accountService.getUserName();
    }
    return this.accountService.isLoggedIn();
  }
  logout(){
    this.accountService.logoutUser();
  }
  isAdmin(){
    return this.accountService.isAdmin()=="true";
  }
}
