import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjectionService {

  constructor(private http: HttpClient) { }

  /**
  getObjectionListToView(extId: string, currPage: Number, itemsPerPage: Number, objectionFetchUrl:string ){
    let parameters = new HttpParams()
    .append("extId", extId)
    .append("page", currPage.toString())
    .append("items", itemsPerPage.toString())
    return this.http.get(environment.apiConfig.base_url+objectionFetchUrl, {params: parameters})
  }

  
  getObjectionListToOperate(extId: string, currPage: Number, itemsPerPage: Number){debugger
    let parameters = new HttpParams()
    .append("extId", extId)
    .append("page", currPage.toString())
    .append("items", itemsPerPage.toString())
    return this.http.get(environment.apiConfig.base_url+"objection/modObjections", {params: parameters})
  }

  getNextPage(currPage: number, itemsPerPage:number, extId: string, url:string){
    let parameters = new HttpParams()
    .append("extId", extId)
    .append("page", currPage.toString())
    .append("items", itemsPerPage.toString())
    return this.http.get(environment.apiConfig.base_url+url, {params: parameters})
  }
   */

  fetchObjection(extId: string, currPage: Number, itemsPerPage: Number, objectionFetchUrl:string ){
    let parameters = new HttpParams()
    .append("extId", extId)
    .append("page", currPage.toString())
    .append("items", itemsPerPage.toString())
    return this.http.get(environment.apiConfig.base_url+objectionFetchUrl, {params: parameters})
  }
}
