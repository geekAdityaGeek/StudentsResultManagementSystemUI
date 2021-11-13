import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { RowOperation } from 'src/enums/rowOperation';
import { MarksVO } from 'src/vo/marksVO';


@Component({
  selector: 'custom-submit-button',
  templateUrl: './custom-submit-button.component.html',
  styleUrls: ['./custom-submit-button.component.css']
})
export class CustomSubmitButtonComponent implements OnInit {

  @Input() btnLabel: string = null;
  @Input() requestUrl: string = null;
  @Input() componentUrl: string = null;
  @Input() requestData: any = null;
  responseData: any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {  }

  fetchData(){

    if(this.requestUrl){
      
      this.http.get(this.requestUrl).subscribe( response => {
        this.responseData = response;
        this.loadComponent();
      })     
    }else{
      this.responseData = this.requestData
      this.loadComponent();
    }
  }

  loadComponent(){
    this.router.navigateByUrl(this.componentUrl,  { state: this.responseData })
  }

  

}
