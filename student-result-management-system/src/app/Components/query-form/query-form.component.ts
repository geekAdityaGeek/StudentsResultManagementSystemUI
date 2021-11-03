import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})
export class QueryFormComponent implements OnInit {

  submitButtonLabel: string = "Submit"
  submitRequestUrl: string = "/sample"
  submitButtonNextPageUrl: string="/results"
  formData : any;

  constructor() { }

  ngOnInit() {
    this.formData = 
      {rollNumber: "MT2020093", subjectId: "A201", subjectName: "Advanced Visual Recognition", marks: "95", totMarks: "100"};
  }

}
