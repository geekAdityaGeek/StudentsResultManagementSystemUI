import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { Actions } from 'src/enums/actionEnums';

@Component({
  selector: 'custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent implements OnInit {

  navBtnLeftListForLoggedIn = [
    {label:"Home", url:'home'},
    {label:"Upload", url:'upload'},
    {label:"View", url:'view-update'},
    {label:"Objections", url:'objections'}
  ];

  allowedList = [
    [Actions.HOME], 
    [Actions.UPLOAD, Actions.BULK_UPLOAD], 
    [Actions.VIEW, Actions.UPDATE, Actions.BULK_UPDATE, Actions.DELETE, Actions.VIEW_OBJECTION],
    [Actions.RAISE_OBJECTION, Actions.REJECT_OBJECTION, Actions.RESOLVE_OBJECTION]
  ]
  
    navBtnLeftListForNotLoggedIn = [
    {label:"Login", url:'login'}, 
    {label:"Register", url:'register'}];
  
  

  constructor(private cookieService: CookieService, 
    private authenticationService: AuthenticationService,
    private commonService: CommonService) { }

  ngOnInit() {
  }

  isLoggedIn(){
    return this.cookieService.check("jwt")
  }

  logout(){debugger
    this.authenticationService.logout()
    this.commonService.loadComponent('/login', null)
  }

  isAllowed(index:number){debugger
    let allowed:boolean = false;
    let roleAction = this.commonService.getActionList() 
    for(let idx=0;idx<roleAction.length;idx++){
      allowed = allowed || this.allowedList[index].includes(roleAction[idx])
    } 
    return allowed
  }
}
