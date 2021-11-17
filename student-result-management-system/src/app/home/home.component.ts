import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDetailsVO } from 'src/vo/userDetailsVO.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  basicDetailForm : FormGroup;
  userDetail : UserDetailsVO ;
  
  constructor(private homeService: HomeService,
    private toastrService: ToastrService) { 
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
    
    this.homeService.getUserDetails("MT2020093").subscribe(
      data => {
        this.userDetail = new UserDetailsVO(
          data['name'], data['gender'], data['contactno'], data['role'],
          data['extId'], data['address'], data['dob'], data['email'], null
        )
        console.log(data)
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
        this.toastrService.error(error.error)
      }
    );    
  }



}
