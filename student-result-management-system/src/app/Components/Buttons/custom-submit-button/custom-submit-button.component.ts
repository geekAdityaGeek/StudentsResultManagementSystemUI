import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router"


@Component({
  selector: 'custom-submit-button',
  templateUrl: './custom-submit-button.component.html',
  styleUrls: ['./custom-submit-button.component.css']
})
export class CustomSubmitButtonComponent implements OnInit {

  @Input() btnLabel: string;
  @Input() requestUrl: string;
  @Input() requestData: any;
  @Input() componentUrl: string
  responseData:any;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  fetchData(){
    let data:MarksVO[] = [] ;
    for(let i=0;i<10;i++){
      let marksVO:MarksVO = {
        rollNumber : "MT2020093",
        subjectCode : "A08",
        subjectName : "Advanced Subject",
        marksObtained : 95,
        totalMarks : 100,
        grade : "A+",
        term: 1,
        year: 2018
      };
      data.push(marksVO);
    }
    this.responseData = data;
    this.loadComponent();
  }

  loadComponent(){
    this.router.navigateByUrl(this.componentUrl,  { state: this.responseData })
  }

  

}
