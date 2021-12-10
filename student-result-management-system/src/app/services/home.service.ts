import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urls } from 'src/enums/UrlMap';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getUserDetails(extId:string){
    let params = new HttpParams().append("extId", extId);
    return this.http.get(Urls.GET_USER_DETAILS, 
          {params:params});
  }

}
