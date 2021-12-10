import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urls } from 'src/enums/UrlMap';
import { environment } from 'src/environments/environment';
import { QueryVO } from 'src/vo/queryVO';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getNextPage(currPage: number, itemPerPage: number, queryVO: QueryVO){
    let param = new HttpParams()
    .append("page", (currPage+1).toString())
    .append("items", itemPerPage.toString())
    .append("rollNumber", queryVO.getRollNumber())
    .append("subjectode", queryVO.getSubjectCode())
    .append("term", queryVO.getTerm().toString())
    .append("year", queryVO.getYear().toString())

    return this.http.get(Urls.MARKS_WITH_PAGINATION, {params: param})
  }

  getPreviousPage(currPage: number, itemPerPage: number, queryVO: QueryVO){
    let param = new HttpParams()
    .append("page", (currPage-1).toString())
    .append("items", itemPerPage.toString())
    .append("rollNumber", queryVO.getRollNumber())
    .append("subjectode", queryVO.getSubjectCode())
    .append("term", queryVO.getTerm().toString())
    .append("year", queryVO.getYear().toString())

    return this.http.get(Urls.MARKS_WITH_PAGINATION, {params: param})
  }
}
