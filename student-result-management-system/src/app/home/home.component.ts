import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserDetailsVO } from 'src/vo/userDetailsVO.model';
import { HomeService } from '../services/home.service';
import jwt_decode from "jwt-decode";
import { CommonService } from '../services/common.service';
import { Actions } from 'src/enums/actionEnums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  basicDetailForm : FormGroup;
  userDetail : UserDetailsVO ;
  
  constructor(private homeService: HomeService,
    private toastrService: ToastrService,
    private commonService: CommonService) { 
      this.basicDetailForm = new FormGroup({
        name : new FormControl("", []),
        extId : new FormControl("", []),
        email: new FormControl("", []),
        contactNo: new FormControl("", []),
        address: new FormControl("", []),
        dob: new FormControl("", []),
        gender: new FormControl("", [])
      })
     }

  ngOnInit() {    
    let decoded = this.commonService.getDecodedToken()
    this.homeService.getUserDetails(decoded['sub']).subscribe(
      data => {
        this.userDetail = new UserDetailsVO(
          data['name'], data['gender'], data['contactno'], data['role'],
          data['extId'], data['address'], data['dob'], data['email'], null
        )
        this.basicDetailForm = new FormGroup({
          name : new FormControl(this.userDetail.getName(), []),
          extId : new FormControl(this.userDetail.getExtId(), []),
          email: new FormControl(this.userDetail.getEmail(), []),
          contactNo: new FormControl(this.userDetail.getContactNo(), []),
          address: new FormControl(this.userDetail.getAddress(), []),
          dob: new FormControl(this.userDetail.getDob(), []),
          gender: new FormControl(this.userDetail.getGender(), [])
        })
      },
      error => {
        this.toastrService.error(error.error, "FAILED")
      }
    );    
  }


  isHomeAllowed(){
    let allowedOperation = this.commonService.getActionList()
    return allowedOperation.includes(Actions.HOME)
  }

}
