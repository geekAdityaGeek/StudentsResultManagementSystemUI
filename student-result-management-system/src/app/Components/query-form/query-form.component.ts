import { query } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { QueryService } from 'src/app/services/query.service';
import { QueryVO } from 'src/vo/queryVO';


export enum queryFormFeilds{
  ROLL_NUMBER = "rollNumber",
  TERM = "term",
  YEAR = "year",
  SUBJECT_CODE = "subjectCode"
}


@Component({
  selector: 'query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})

export class QueryFormComponent implements OnInit {


  submitButtonLabel: string = "Submit"
  submitRequestUrl: string = "/getMarks"
  submitButtonNextPageUrl: string="/results"
  viewQuery: QueryVO;
  queryForm: FormGroup;
  subjectCodes: string[] = []
  
  constructor(private commonService: CommonService,
    private toastrService: ToastrService,
    private queryService: QueryService
    ) { }

  ngOnInit() {
    this.queryForm = new FormGroup({
      rollNumber: new FormControl('', []),
      term: new FormControl('', []),
      year: new FormControl('', []),
      subjectCode: new FormControl('', []) 
    });
    this.commonService.getSubjectCodes(
      (subjectCodes) => {this.subjectCodes = subjectCodes; this.subjectCodes.unshift(null)} 
      )
  }

  clearForm(){
    this.queryForm.reset();
  }

  dataExtractor = () => {

    let queryData = new QueryVO(
      this.queryForm.get(queryFormFeilds.ROLL_NUMBER).value,
      this.queryForm.get(queryFormFeilds.SUBJECT_CODE).value,
      null,
      Number(this.queryForm.get(queryFormFeilds.TERM).value),
      Number(this.queryForm.get(queryFormFeilds.YEAR).value),
    )
    return queryData;
  }

  submitQuery(){

    let params = new HttpParams()
    .append("rollNumber", this.queryForm.get("rollNumber").value)
    .append("subjectode", this.queryForm.get("subjectCode").value)
    .append("term", this.queryForm.get("term").value)
    .append("year", this.queryForm.get("year").value)

    

    let query = new QueryVO(
      this.queryForm.get("rollNumber").value,
      this.queryForm.get("subjectCode").value,
      null,
      this.queryForm.get("term").value,
      this.queryForm.get("year").value
    );

    this.queryService.getMarks(params).subscribe(
      (data) => {
        this.commonService.loadComponent("/results", {'query':query, 'marks':data})
      },
      (error)=>{
        this.toastrService.error("Cannot fetch results", "Failed");
      })    
  }
  



}
