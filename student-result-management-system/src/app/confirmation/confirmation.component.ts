import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MarksVO } from 'src/vo/marksVO';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  resultData;
  arrayResultData:string[][];
  columnHeading:string[] = []
  colWidth:string[] = []
  backBtnLabel:string = "Cancel"
  backUrl:string = "home"
  submitBtnLabel:string = "Submit"
  userConf:string = "user-conf"
  savingUrl:string

  opSuccess:boolean = null
  failureMessage:string = "failed" 
  

  constructor(private router:Router, 
    private activatedRoute:ActivatedRoute,
    private commonService: CommonService,
    private http: HttpClient, 
    private toastrService: ToastrService) { 

    let passedData = this.router.getCurrentNavigation().extras.state
    
    if(passedData == undefined)  
      this.router.navigateByUrl('home')
  
    this.columnHeading = passedData['columnHeading']
    this.colWidth = passedData['colWidth']
    this.resultData = passedData['data']
    this.savingUrl = passedData['savingUrl']
    
    console.log(this.resultData);

    this.convertToResultArray()
  }

  convertToResultArray(){
    this.arrayResultData = [];
    for(let i=0;i<this.resultData.length;i++){
      this.arrayResultData.push([]);
      this.arrayResultData[i].push(this.resultData[i]['rollNo'])
      this.arrayResultData[i].push(this.resultData[i]['subjectCode']
                  +":"+this.resultData[i]['subjectName'])
      this.arrayResultData[i].push(this.resultData[i]['year'])
      this.arrayResultData[i].push(this.resultData[i]['term'])
      this.arrayResultData[i].push(this.resultData[i]['marksObtained'])
      this.arrayResultData[i].push(this.resultData[i]['totalMarks'])
      this.arrayResultData[i].push(this.resultData[i]['grade']) 
      debugger
      if(this.resultData[i]['comments'])
        this.arrayResultData[i].push(this.resultData[i]['comments'])
      this.arrayResultData[i].push(this.resultData[i]['operation'])   
      this.arrayResultData[i].push(this.resultData[i]['operation'])        
    }
    console.log(this.arrayResultData)
  }

  ngOnInit() {
  }

  cancelOperation(){
    this.commonService.loadComponent('home', null)
  }

  saveData(){
    this.http.post(environment.apiConfig.base_url+this.savingUrl, this.resultData).subscribe(
      (data) => {
        this.opSuccess = true
        this.toastrService.success("Operation Successfull", "Success");
      },
      (error) => {
        this.opSuccess = false
        this.toastrService.error("Opeartion Failed", "Failed")
      }
    )
  }

  doneOperation(){
    this.commonService.loadComponent('home', null)
  }

}
