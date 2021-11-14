import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Upload } from "../upload/upload.model";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  
  constructor(private http: HttpClient) {}

  uploadMarks(uploadObj: Upload): Observable<any> {
    return this.http.post(
      environment.apiConfig.base_url + "moderator/singleUpload",
      uploadObj
    );
  }

  bulkUpload(file: File) {
    let body = new FormData();
    body.append("file", file);
    return this.http.post(
      environment.apiConfig.base_url + "moderator/bulkUpload",
      body
    );
  }

  bulkUpdate(bulkUpdateFile: File) {
    let body = new FormData();
    body.append("file", bulkUpdateFile);
    return this.http.post(
      environment.apiConfig.base_url + "moderator/bulkUpdate",
      body
    );
  }
}
