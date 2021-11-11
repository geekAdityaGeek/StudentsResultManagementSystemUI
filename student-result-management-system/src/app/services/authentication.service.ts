import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { userDetailsVO } from "src/vo/userDetailsVO.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  fetchRoles() {
    return this.http.get(environment.apiConfig.base_url + "allRoles");
  }
  registerUser(userDetails: userDetailsVO): Observable<any> {
    return this.http.post(
      environment.apiConfig.base_url + "register",
      userDetails,
      {}
    );
  }
}
