import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RowOperation } from 'src/enums/rowOperation';
import { ObjectionVO } from 'src/vo/objectionVO';

@Component({
  selector: 'app-objections',
  templateUrl: './objections.component.html',
  styleUrls: ['./objections.component.css']
})
export class ObjectionsComponent implements OnInit {

  columnHeading:string[] = ["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE", "COMMENTS"]
  colWidth:string[] = ["15%","15%","10%","10%","10%", "10%", "10%", "10%"]
  objectionData:ObjectionVO[] = []
  arrayResultData : string[][];
  submitBtnLabel:string = "Submit"
  userConf:string = "user-conf"
  otherPageResult:string = "results"
  prevPageBtnLabel:string = "Previous"
  nextPageBtnLabel:string = "Next"
  operationList:RowOperation[] = [];
  resolvedObjections:ObjectionVO[] = [];
  rejectedObjections:ObjectionVO[] = [];
  objectionQueryUrl: string

  constructor(private http: HttpClient) { 
    this.allowedOperation();
  }

  convertToResultArray(){
    this.arrayResultData = [];
    for(let i=0;i<this.objectionData.length;i++){
      this.arrayResultData.push([]);
      this.arrayResultData[i].push(this.objectionData[i].getRollNumber())
      this.arrayResultData[i].push(this.objectionData[i].getSubjectCode()
                  +":"+this.objectionData[i].getSubjectName())
      this.arrayResultData[i].push(this.objectionData[i].getYear().toString())
      this.arrayResultData[i].push(this.objectionData[i].getTerm().toString())
      this.arrayResultData[i].push(this.objectionData[i].getMarksObtained().toString())
      this.arrayResultData[i].push(this.objectionData[i].getTotalMarks().toString())
      this.arrayResultData[i].push(this.objectionData[i].getGrade())    
      this.arrayResultData[i].push(this.objectionData[i].getComments())  
    }
  }

  ngOnInit() { 
    for(let idx=0;idx<10;idx++){
      let objection = new ObjectionVO(
        "MT2020093", "A08", "Advanced Subject", 95, 100, "A+",
        1, 2018,"", RowOperation.UPDATE
      );
      this.objectionData.push(objection);
      
    }
    this.convertToResultArray()    
  }

  
  allowedOperation(){
    this.operationList.push(RowOperation.RESOLVE);
    this.operationList.push(RowOperation.REJECT);
  }

  updateData(changedData:any){debugger
    this.resolvedObjections = [];
    this.rejectedObjections = [];
    for(let idx=0; idx<changedData.length; idx++){
      let subjectInfo = changedData[idx][1].split(":")
      let objection = new ObjectionVO(
        changedData[idx][0],
        subjectInfo[0],
        subjectInfo[1],
        changedData[idx][4],
        changedData[idx][5],
        changedData[idx][6],
        changedData[idx][2],
        changedData[idx][3],
        changedData[idx][7],  
        changedData[idx][8]      
      );
      if(objection.getState() == RowOperation.REJECT){
        this.rejectedObjections.push(objection)
      }else if(objection.getState() == RowOperation.RESOLVE){
        this.resolvedObjections.push(objection)
      }
    }  
  }

  dataExtractor = () => {debugger;
    let requestData: ObjectionVO[] = [];
    for(let idx=0;idx<this.resolvedObjections.length;idx++){
      requestData.push(this.resolvedObjections[idx])
    }
    for(let idx=0;idx<this.rejectedObjections.length;idx++){
      requestData.push(this.rejectedObjections[idx])
    }
    return requestData
  }

}
