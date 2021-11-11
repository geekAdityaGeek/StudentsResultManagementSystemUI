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

  fetchTerms(): Observable<any> {
    return this.http.get(environment.apiConfig.base_url + "moderator/getUniqueTerms");
  }

  fetchSubjectCodes(): Observable<any> {
    return this.http.get(
      environment.apiConfig.base_url + "moderator/getListSubjCodeName"
    );
  }
}
