import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModeratorObjectionConf } from 'src/configurations/moderatorObjectionConf';
import { ObjectionRoleConf } from 'src/configurations/ObjectionRoleConf';
import { RowOperation } from 'src/enums/rowOperation';
import { environment } from 'src/environments/environment';
import { ObjectionVO } from 'src/vo/objectionVO';
import { CommonService } from '../services/common.service';
import { ObjectionService } from '../services/objection.service';

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
  currPage = 0

  constructor(private http: HttpClient,
    private commonService: CommonService,
    private objectionService: ObjectionService,
    private toastrService: ToastrService) { 
    this.configurer = new ModeratorObjectionConf(this.commonService, this.objectionService)      
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
    this.configurer.getObjectionData("MOD2020093", this.currPage, environment.apiConfig.items_per_page).subscribe(
      data => {debugger
        this.objectionData = this.commonService.mapToObjectionData(data);
        this.convertToResultArray()
      },
      error => {
        this.toastrService.error("Unable to get objections");
      }
    );
    
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

}
