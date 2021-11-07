import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksVO } from 'src/vo/marksVO';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  resultData:MarksVO[];
  arrayResultData:string[][];
  columnHeading:string[] = ["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE", "OPERATION"]
  colWidth:string[] = ["15%","30%","10%","10%","10%", "10%", "10%"]
  backBtnLabel:string = "Back"
  backUrl:string = "results"
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
      this.arrayResultData[i].push(this.resultData[i].rollNumber)
      this.arrayResultData[i].push(this.resultData[i].subjectCode+":"+this.resultData[i].subjectName)
      this.arrayResultData[i].push(this.resultData[i].year.toString())
      this.arrayResultData[i].push(this.resultData[i].term.toString())
      this.arrayResultData[i].push(this.resultData[i].marksObtained.toString())
      this.arrayResultData[i].push(this.resultData[i].totalMarks.toString())
      this.arrayResultData[i].push(this.resultData[i].grade) 
      this.arrayResultData[i].push(this.resultData[i].state)  
    }
  }

  ngOnInit() {
  }

}
