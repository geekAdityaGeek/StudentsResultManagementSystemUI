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

  columnHeading:string[] = ["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE"]
  colWidth:string[] = ["15%","30%","10%","10%","10%", "10%", "10%"]
  resultData:ObjectionVO[]
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

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get(this.objectionQueryUrl);

  }

}
