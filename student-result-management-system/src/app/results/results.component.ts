import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  columnHeading:string[] = ["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE"]
  resultData:MarksVO[]
  arrayResultData : string[][];
  backBtnLabel:string = "Back"
  backUrl:string = "view-update"
  submitBtnLabel:string = "Submit"
  userConf:string = "user-conf"

  constructor(private router:Router, private activatedRoute:ActivatedRoute) { 
    this.resultData = <MarksVO[]>this.router.getCurrentNavigation().extras.state
    if(this.resultData == undefined)  
      return;
    this.convertToResultArray()
  }

  convertToResultArray(){
    this.arrayResultData = [];
    for(let i=0;i<this.resultData.length;i++){
      this.arrayResultData.push([]);
      this.arrayResultData[i].push(this.resultData[i].rollNumber)
      this.arrayResultData[i].push(this.resultData[i].subjectCode+":"+this.resultData[i].subjectName)
      this.arrayResultData[i].push(this.resultData[i].year.toString())
      this.arrayResultData[i].push(this.resultData[i].term.toString())
      this.arrayResultData[i].push(this.resultData[i].marksObtained.toString())
      this.arrayResultData[i].push(this.resultData[i].totalMarks.toString())
      this.arrayResultData[i].push(this.resultData[i].grade)      
    }
    debugger
  }

  ngOnInit() { }

}
