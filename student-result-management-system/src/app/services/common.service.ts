import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RowOperation } from 'src/enums/rowOperation';
import { environment } from 'src/environments/environment';
import { MarksVO } from 'src/vo/marksVO';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, 
    private toastrService: ToastrService,
    private router: Router) {}

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
      let marks = new MarksVO(
        data[idx].rollNo,
        data[idx].subjectCode,
        data[idx].subjectName,
        data[idx].marksObtained,
        data[idx].totalMarks,
        data[idx].grade,
        data[idx].year,
        data[idx].term,
        RowOperation.NONE
      );
      marksData.push(marks)
    }
    return marksData
    
  }


}
