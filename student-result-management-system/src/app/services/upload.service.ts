import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { environment } from "src/environments/environment";
import { Upload } from "../upload/upload.model";
import { CookieService } from "ngx-cookie-service";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private cookieService: CookieService
  ) {}

  uploadMarks(uploadObj: Upload): Observable<any> {
    var decoded: { sub: string; role: string; exp: number; iat: number } = null;
    if (this.cookieService.check("jwt")) {
      decoded = jwt_decode(this.cookieService.get("jwt"));
    }
    return this.http.post(
      environment.apiConfig.base_url + "moderator/singleUpload?extId=" + decoded.sub,
      uploadObj,
      {
        params: new HttpParams()
          .set('extId', decoded.sub)
      }
    );
  }

  bulkUpload(file: File) {
    var decoded: { sub: string; role: string; exp: number; iat: number } = null;
    if (this.cookieService.check("jwt")) {
      decoded = jwt_decode(this.cookieService.get("jwt"));
    }
    let body = new FormData();
    body.append("file", file);
    return this.http.post(
      environment.apiConfig.base_url + "moderator/bulkUpload",
      body,
      {
        params: new HttpParams()
          .set('extId', decoded.sub)
      }
    );
  }

  bulkUpdate(bulkUpdateFile: File) {
    var decoded: { sub: string; role: string; exp: number; iat: number } = null;
    console.log(this.cookieService.check("jwt"));
    if (this.cookieService.check("jwt")) {
      decoded = jwt_decode(this.cookieService.get("jwt"));
    }
    let body = new FormData();
    body.append("file", bulkUpdateFile);
    return this.http.post(
      environment.apiConfig.base_url + "moderator/bulkUpdate",
      body,
      {
        params: new HttpParams()
          .set('extId', decoded.sub)
      }
    );
  }
}
