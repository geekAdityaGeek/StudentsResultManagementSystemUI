import { query } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { QueryService } from 'src/app/services/query.service';
import { ResultService } from 'src/app/services/result.service';
import { environment } from 'src/environments/environment';
import { QueryVO } from 'src/vo/queryVO';
import jwt_decode from "jwt-decode";

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
  termList = []
  yearList = []
  decoded: { sub: string; role: string; exp: number; iat: number } = null;
  
  
  constructor(private commonService: CommonService,
    private toastrService: ToastrService,
    private queryService: QueryService,
    private resultService: ResultService,
    private cookieService: CookieService
    ) { }

  ngOnInit() {
    if (this.cookieService.check("jwt")) {
      this.decoded = jwt_decode(this.cookieService.get("jwt"));
    }
    
    this.queryForm = new FormGroup({
      rollNumber: new FormControl('', []),
      term: new FormControl('', []),
      year: new FormControl('', []),
      subjectCode: new FormControl('', []) 
    });
    this.commonService.getSubjectCodes(
      (subjectCodes) => {this.subjectCodes = subjectCodes; this.subjectCodes.unshift(null)})
    this.commonService.fetchTerms().subscribe(
      data => {this.termList = data, this.termList.unshift(null) },
      error => this.toastrService.error("Unable to get terms", "FAILURE")
    )
    this.yearList = this.commonService.getYears()
    this.yearList.unshift(null);
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

  submitQuery(){debugger

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

      debugger
      this.resultService.getNextPage(-1, environment.apiConfig.items_per_page, query).subscribe(
        (data) => {
          this.commonService.loadComponent("/results", {'query':query, 'marks':data})
        },
        (error) => {
          this.toastrService.error(error.error, "Failed");
        }
      )
  }
  
  fixRollNumber(){
    this.queryForm.get("rollNumber").setValue(this.decoded['sub'])
  }


  isDisabled(){debugger
    let disabled = this.decoded['role'] === 'student';
    if (disabled){
      this.fixRollNumber()
    }
    return disabled;    
  }



}
