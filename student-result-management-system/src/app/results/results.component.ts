import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RowOperation } from 'src/enums/rowOperation';
import { environment } from 'src/environments/environment';
import { MarksVO } from 'src/vo/marksVO';
import { QueryVO } from 'src/vo/queryVO';
import { CommonService } from '../services/common.service';
import { ResultService } from '../services/result.service';

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
  objectedMarks:MarksVO[] = [];
  queryVO: QueryVO;
  currPage:number = 0;
  
  

  constructor(private router:Router, 
    private activatedRoute:ActivatedRoute, 
    private commonService: CommonService,
    private resultService: ResultService,
    private toastrService: ToastrService
    ) { 

    let responseData = <any>this.router.getCurrentNavigation().extras.state
    this.resultData = this.commonService.mapToMarksData(responseData['marks']);
    this.queryVO = <QueryVO>responseData['query'] 
    if(this.resultData == undefined)  
      this.router.navigateByUrl('home')
    this.convertToResultArray()
    this.allowedOperation()
    
  }

  convertToResultArray(){
    this.arrayResultData = [];
    for(let i=0;i<this.resultData.length;i++){
      this.arrayResultData.push([]);
      console.log(typeof this.resultData[i])
      this.arrayResultData[i].push(this.resultData[i].getRollNo())
      this.arrayResultData[i].push(this.resultData[i].getSubjectCode()
                  +":"+this.resultData[i].getSubjectName())
      this.arrayResultData[i].push(this.resultData[i].getYear().toString())
      this.arrayResultData[i].push(this.resultData[i].getTerm().toString())
      this.arrayResultData[i].push(this.resultData[i].getMarksObtained().toString())
      this.arrayResultData[i].push(this.resultData[i].getTotalMarks().toString())
      this.arrayResultData[i].push(this.resultData[i].getGrade()) 
      this.arrayResultData[i].push(RowOperation.NONE)      
    }
  }

  ngOnInit() { }

  allowedOperation(){
    this.operationList.push(RowOperation.UPDATE);
    this.operationList.push(RowOperation.DELETE);
    this.operationList.push(RowOperation.OBJECTION);
  }

  updateData(changedData:any){debugger
    this.updatedMarks = [];
    this.deletedMarks = [];
    this.objectedMarks = [];
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
      debugger
      if(marks.getOperation() == RowOperation.UPDATE){
        this.updatedMarks.push(marks)
      }else if(marks.getOperation() == RowOperation.DELETE){
        this.deletedMarks.push(marks)
      }else if(marks.getOperation() == RowOperation.OBJECTION){
        this.objectedMarks.push(marks)
      }
    }  
  }

  dataExtractor = () => {
    let finalData = {};
    finalData['columnHeading']=["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE", "OPERATION"]
    finalData['colWidth'] = ["15%","30%","10%","10%","10%", "10%", "10%"]
    //finalData['savingUrl'] = "moderator/updateMarks"
    finalData['savingUrl']="objection/raiseObjection"
    let requestData: MarksVO[] = [];
    for(let idx=0;idx<this.updatedMarks.length;idx++){
      requestData.push(this.updatedMarks[idx])
    }
    for(let idx=0;idx<this.deletedMarks.length;idx++){
      requestData.push(this.deletedMarks[idx])
    }
    for(let idx=0;idx<this.objectedMarks.length;idx++){
      requestData.push(this.objectedMarks[idx])
    }

    finalData['data'] = requestData;
    return finalData
  }

  getDownloadLink(){
    let params = new HttpParams()
    .append("rollNumber", this.queryVO["rollNumber"])
    .append("subjectode", this.queryVO["subjectCode"])
    .append("term", this.queryVO["term"].toString())
    .append("year", this.queryVO["year"].toString())
    
    return environment.apiConfig.base_url + "download/result/pdf?"+params.toString()
  }

  previousPage(){
    this.resultService.getPreviousPage(this.currPage, environment.apiConfig.items_per_page, this.queryVO).subscribe(
      (data) => {
        this.resultData = this.commonService.mapToMarksData(data);
        this.convertToResultArray();  
        this.currPage-=1
        console.log(this.currPage)
      },
      (error) => {
        this.toastrService.error(error.error.message, "Failed");
      }
    )
  }

  nextPage(){
    this.resultService.getNextPage(this.currPage, environment.apiConfig.items_per_page, this.queryVO).subscribe(
      (data) => {
        this.resultData = this.commonService.mapToMarksData(data);
        this.convertToResultArray();  
        this.currPage+=1
        console.log(this.currPage)
      },
      (error) => {
        this.toastrService.error(error.error.message, "Failed");
      }
    )
  }

}
