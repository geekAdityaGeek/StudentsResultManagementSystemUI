import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MarksVO } from 'src/vo/marksVO';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  getMarks(queryParameters: HttpParams){
    console.log(queryParameters)
    return this.http.get<MarksVO[]>(
      environment.apiConfig.base_url + "marks",
      {params: queryParameters}
    );
  }
  
}
