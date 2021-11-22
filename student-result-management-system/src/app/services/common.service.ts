import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RowOperation } from 'src/enums/rowOperation';
import { environment } from 'src/environments/environment';
import { MarksVO } from 'src/vo/marksVO';
import { ObjectionVO } from 'src/vo/objectionVO';
import jwt_decode from "jwt-decode";
import { Actions } from 'src/enums/actionEnums';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, 
    private toastrService: ToastrService,
    private router: Router, 
    private cookieService: CookieService) {}

  fetchTerms(): Observable<any> {
    return this.http.get(
      environment.apiConfig.base_url + "moderator/getUniqueTerms"
    );
  }

  fetchSubjectCodes(): Observable<any> {
    return this.http.get(
      environment.apiConfig.base_url + "moderator/getListSubjCodeName"
    );
  }

  getEnumInverseMap(Values){
    return Object.keys(Values).map(key => Values[key]).filter(k => !(parseInt(k) >= 0))
  }


  getYears() {
    let years = []
    let date = new Date();
    let year = date.getFullYear();
    for (let i = 0; i <= 10; i++) {
      let y = year + i;
      years.push(y.toString());
    }
    return years
  }

  getSubjectCodes(populateSubjectCode) {
    this.fetchSubjectCodes().subscribe(
      (data) => {
        let subjectCodes = []  
        for (let i = 0; i < data.length; i++) {
          subjectCodes.push(data[i]);
        }            
        populateSubjectCode(subjectCodes)
      },
      (error) => {
        this.toastrService.error("Subject Codes Fetching Failed", "Failed");
      }
    );
  }

  getTerms(populateTerms : any) {
    this.fetchTerms().subscribe(
      (data) => {
        let terms = []
        for (let i = 0; i < data.length; i++) {
          terms.push(data[i]);
        }
        populateTerms(terms)
      },
      (error) => {
        this.toastrService.error("Terms Fetching Failed", "Failed");
      }
    );
  }

  loadComponent(componentUrl:string, responseData: any){
    this.router.navigateByUrl(componentUrl,  { state: responseData })
  }

  mapToMarksData(data){
    let marksData = [];
    for(let idx=0; idx<data.length; idx++){
      let marks = this.mapToMarksVO(data[idx])
      marksData.push(marks)
    }
    return marksData    
  }

  mapToMarksVO(data){
    return new MarksVO(
      data.rollNo, data.subjectCode, data.subjectName, data.marksObtained,
      data.totalMarks, data.grade, data.year, data.term, RowOperation.NONE
    );
  }

  mapMarksArrayToMarksVO(arrayMarks : string[]){
    let subjectInfo = arrayMarks[1].split(":");
    let marks = new MarksVO(
      arrayMarks[0], subjectInfo[0], subjectInfo[1], Number(arrayMarks[4]),
      Number(arrayMarks[5]), arrayMarks[6], Number(arrayMarks[2]), Number(arrayMarks[3]),
      RowOperation[ arrayMarks[7] ]
    );
    return marks
  }

  mapToObjectionData(data: any){debugger
    let objectionData = [];
    for(let idx=0; idx<data.length; idx++){
      let objection = this.mapToObjectionVO(data[idx])
      objectionData.push(objection)
    }
    return objectionData
  }

  mapToObjectionVO(data){
    return new ObjectionVO(
      data.rollNo, data.subjectCode, data.subjectName, data.marksObtained,
      data.totalMarks, data.grade, data.year, data.term, data.comments, data.status
    );
  }

  mapObjectionArrayToObjectionVO(arrayObjection: string[]){
    let subjectInfo = arrayObjection[1].split(":")
    let objection = new ObjectionVO(
      arrayObjection[0],
      subjectInfo[0],
      subjectInfo[1],
      Number(arrayObjection[4]),
      Number(arrayObjection[5]),
      arrayObjection[6],
      Number(arrayObjection[2]),
      Number(arrayObjection[3]),
      arrayObjection[7],  
      RowOperation[arrayObjection[8]])      
    return objection;
  }


  getDecodedToken(){
    var decoded: { sub: string; role: string; exp: number; iat: number } = null;
    if (this.cookieService.check("jwt")) {
      decoded = jwt_decode(this.cookieService.get("jwt"));
    }
    return decoded;
  }

  getIntersection(list1,list2){
    return  list1.filter(x => list2.includes(x));
  }

  getActionList(){
    let allowedOperations = JSON.parse(localStorage.getItem("allowedOperation"))
    let operation = allowedOperations
    return operation
  }

  getUserAllowedAction(role: string){
    return this.http.get(environment.apiConfig.base_url+"actionsByRole/"+role)
  }

}
