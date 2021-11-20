import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ModeratorObjectionConf } from 'src/configurations/moderatorObjectionConf';
import { ObjectionRoleConf } from 'src/configurations/ObjectionRoleConf';
import { StudentObjectionConf } from 'src/configurations/studentObjectionConf';
import { RowOperation } from 'src/enums/rowOperation';
import { ObjectionVO } from 'src/vo/objectionVO';
import { CommonService } from '../services/common.service';
import { ObjectionService } from '../services/objection.service';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'objections',
  templateUrl: './objections.component.html',
  styleUrls: ['./objections.component.css']
})
export class ObjectionsComponent implements OnInit {

  columnHeading:string[] = ["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE", "COMMENTS"]
  colWidth:string[] = ["15%","15%","10%","10%","10%", "10%", "10%", "10%"]
  disabledInputs: boolean[] = [true, true, true, true, false, false, false, false]
  objectionData:ObjectionVO[] = []
  arrayResultData : string[][];
  submitBtnLabel:string = "Submit"
  userConf:string = "user-conf"
  otherPageResult:string = "results"
  prevPageBtnLabel:string = "Previous"
  nextPageBtnLabel:string = "Next"
  operationList:RowOperation[] = [];
  objectionQueryUrl: string
  configurer: ObjectionRoleConf;
  currPage:number = -1;
  totalPage:number = 0;
  decoded: { sub: string; role: string; exp: number; iat: number } = null;

  constructor(private http: HttpClient,
    private commonService: CommonService,
    private objectionService: ObjectionService,
    private toastrService: ToastrService,
    private cookieService: CookieService) { 
      
      if (this.cookieService.check("jwt")) {
        this.decoded = jwt_decode(this.cookieService.get("jwt"));
      }
      if (this.decoded.role === "STUDENT") {
        this.configurer = new StudentObjectionConf(this.commonService, this.objectionService)
      } else {
        this.configurer = new ModeratorObjectionConf(this.commonService, this.objectionService)      
      }
      this.operationList = this.configurer.getAllowedOperation();
  }

  convertToResultArray(){debugger;
    this.arrayResultData = [];
    for(let i=0;i<this.objectionData.length;i++){
      let objectionComments = this.objectionData[i].getOperation() ? this.objectionData[i].getOperation() : " "
      this.arrayResultData.push([]);
      this.arrayResultData[i].push(this.objectionData[i].getRollNo())
      this.arrayResultData[i].push(this.objectionData[i].getSubjectCode()
                  +":"+this.objectionData[i].getSubjectName())
      this.arrayResultData[i].push(this.objectionData[i].getYear().toString())
      this.arrayResultData[i].push(this.objectionData[i].getTerm().toString())
      this.arrayResultData[i].push(this.objectionData[i].getMarksObtained().toString())
      this.arrayResultData[i].push(this.objectionData[i].getTotalMarks().toString())
      this.arrayResultData[i].push(this.objectionData[i].getGrade())    
      this.arrayResultData[i].push(objectionComments)  
      this.arrayResultData[i].push(this.objectionData[i].getOperation())
    }
  }

  ngOnInit() { 
    this.currPage = -1;
    this.nextPage()
  }
  
  operatedDataProcessing(operatedData:any){
    this.configurer.processOperatedData(operatedData)  
  }

  dataExtractor = () => {
    let finalData = {};
    finalData['columnHeading']=["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE", "COMMENTS", "OPERATION"]
    finalData['colWidth'] = ["15%","15%","10%","10%","10%", "10%", "10%", "10%"]
    finalData['savingUrl'] = this.configurer.getOperationUrl()
    finalData['data'] = this.configurer.getRequestDataForOperation();
    return finalData
  }

  nextPage(){

    this.configurer.getObjectionData(this.decoded['sub'], this.currPage+1, environment.apiConfig.items_per_page).subscribe(
      data => {
        this.totalPage = data["totalPage"];
        if(this.totalPage == 0){
          this.currPage = -1;
          return
        }
        this.objectionData = this.commonService.mapToMarksData(data["objectionVOList"]);
        this.convertToResultArray()
        this.currPage += 1;
        
      },
      error => {
        this.toastrService.warning("No More Pages Present!!");
      },
    )
  }

  previousPage(){
    this.configurer.getObjectionData(this.decoded['sub'], this.currPage-1, environment.apiConfig.items_per_page).subscribe(
      data => {
        this.totalPage = data["totalPage"];
        if(this.totalPage == 0){
          this.currPage = -1;
          return
        }
        this.objectionData = this.commonService.mapToMarksData(data["objectionVOList"]);
        this.convertToResultArray()
        this.currPage -= 1;        
      },
      error => {
        this.toastrService.warning("This is the first page!!");
      },
    )
      
  }

}
