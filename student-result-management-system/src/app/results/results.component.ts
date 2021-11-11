import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RowOperation } from 'src/enums/rowOperation';
import { MarksVO } from 'src/vo/marksVO';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  columnHeading:string[] = ["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE"]
  colWidth:string[] = ["15%","30%","10%","10%","10%", "10%", "10%"]
  resultData:MarksVO[]
  arrayResultData : string[][];
  backBtnLabel:string = "Back"
  backUrl:string = "view-update"
  submitBtnLabel:string = "Submit"
  userConf:string = "user-conf"
  otherPageResult:string = "results"
  prevPageBtnLabel:string = "Previous"
  nextPageBtnLabel:string = "Next"
  operationList:RowOperation[] = [];
  updatedMarks:MarksVO[] = [];
  deletedMarks:MarksVO[] = [];


  constructor(private router:Router, private activatedRoute:ActivatedRoute) { 
    this.resultData = <MarksVO[]>this.router.getCurrentNavigation().extras.state
    if(this.resultData == undefined)  
      this.router.navigateByUrl('home')
    this.convertToResultArray()
    this.allowedOperation()
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
    }
  }

  ngOnInit() { }

  allowedOperation(){
    this.operationList.push(RowOperation.UPDATE);
    this.operationList.push(RowOperation.DELETE);
  }

  updateData(changedData:any){debugger
    this.updatedMarks = [];
    this.deletedMarks = [];
    for(let idx=0; idx<changedData.length; idx++){
      let subjectInfo = changedData[idx][1].split(":")
      let marks = new MarksVO(
        changedData[idx][0],
        subjectInfo[0],
        subjectInfo[1],
        changedData[idx][4],
        changedData[idx][5],
        changedData[idx][6],
        changedData[idx][2],
        changedData[idx][3],
        changedData[idx][7],        
      );
      if(marks.getState() == RowOperation.UPDATE){
        this.updatedMarks.push(marks)
      }else if(marks.getState() == RowOperation.DELETE){
        this.deletedMarks.push(marks)
      }
    }  
  }

  dataExtractor = () => {debugger;
    let requestData: MarksVO[] = [];
    for(let idx=0;idx<this.updatedMarks.length;idx++){
      requestData.push(this.updatedMarks[idx])
    }
    for(let idx=0;idx<this.deletedMarks.length;idx++){
      requestData.push(this.deletedMarks[idx])
    }
    return requestData
  }

}
