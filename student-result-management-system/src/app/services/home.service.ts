import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getUserDetails(extId:string){
    let params = new HttpParams().append("extId", extId);
    return this.http.get(environment.apiConfig.base_url+"user/details", 
          {params:params});
  }

}
