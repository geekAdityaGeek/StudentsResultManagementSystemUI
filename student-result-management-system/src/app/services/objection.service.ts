import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjectionService {

  constructor(private http: HttpClient) { }

  getObjectionListToView(extId: string){
    let parameters = new HttpParams()
    .append("extId", extId)
    return this.http.get(environment.apiConfig.base_url+"objection/studentObjections", {params: parameters})
  }

  getObjectionListToOperate(extId: string, currPage: Number, itemsPerPage: Number){debugger
    let parameters = new HttpParams()
    .append("extId", extId)
    .append("page", currPage.toString())
    .append("items", itemsPerPage.toString())
    return this.http.get(environment.apiConfig.base_url+"objection/modObjections", {params: parameters})
  }
}
