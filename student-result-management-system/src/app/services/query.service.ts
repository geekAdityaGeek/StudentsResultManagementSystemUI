import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urls } from 'src/enums/UrlMap';
import { environment } from 'src/environments/environment';
import { MarksVO } from 'src/vo/marksVO';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  getMarks(queryParameters: HttpParams){
    
    return this.http.get<MarksVO[]>(
      Urls.GET_MARKS,
      {params: queryParameters}
    );
  }
  
}
