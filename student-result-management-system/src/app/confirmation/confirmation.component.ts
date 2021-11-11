import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksVO } from 'src/vo/marksVO';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  resultData:MarksVO[];
  arrayResultData:string[][];
  columnHeading:string[] = ["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE", "OPERATION"]
  colWidth:string[] = ["15%","30%","10%","10%","10%", "10%", "10%"]
  backBtnLabel:string = "Cancel"
  backUrl:string = "home"
  submitBtnLabel:string = "Submit"
  userConf:string = "user-conf"

  opSuccess:boolean = null
  failureMessage:string = "failed" 
  

  constructor(private router:Router, private activatedRoute:ActivatedRoute) { 
    this.resultData = <MarksVO[]>this.router.getCurrentNavigation().extras.state
    if(this.resultData == undefined)  
      this.router.navigateByUrl('home')
    this.convertToResultArray()
  }

  convertToResultArray(){
    this.arrayResultData = [];
    for(let i=0;i<this.resultData.length;i++){
      this.arrayResultData.push([]);
      this.arrayResultData[i].push(this.resultData[i].getRollNumber())
      this.arrayResultData[i].push(this.resultData[i].getSubjectCode()
                  +":"+this.resultData[i].getSubjectName())
      this.arrayResultData[i].push(this.resultData[i].getYear().toString())
      this.arrayResultData[i].push(this.resultData[i].getTerm().toString())
      this.arrayResultData[i].push(this.resultData[i].getMarksObtained().toString())
      this.arrayResultData[i].push(this.resultData[i].getTotalMarks().toString())
      this.arrayResultData[i].push(this.resultData[i].getGrade()) 
      this.arrayResultData[i].push(this.resultData[i].getState())  
    }
  }

  ngOnInit() {
  }

}
