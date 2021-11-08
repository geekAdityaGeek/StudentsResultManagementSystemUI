import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent implements OnInit {

  navBtnLeftList = [{label:"Home", url:'home'},
    {label:"Upload", url:'upload'},
    {label:"View", url:'view-update'},
    {label:"Objections", url:'objections'},
    {label:"Register", url:'register'},
    {label:"Login", url:'login'}];
    
  navBtnRightList = [{label:"Logout", url:'/logout'}]
  


  constructor() { }

  ngOnInit() {
  }

}
