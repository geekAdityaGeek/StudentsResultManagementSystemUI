import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  submitRequestUrl: string = "/sample"
  submitButtonNextPageUrl: string="/results"
  viewQuery: QueryVO;
  queryForm: FormGroup;
  
  constructor() { }

  ngOnInit() {
    this.queryForm = new FormGroup({
      rollNumber: new FormControl("", []),
      term: new FormControl("", []),
      year: new FormControl("", []),
      subjectCode: new FormControl("", []) 
    });
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


}
