import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { userDetailsVO } from "src/vo/userDetailsVO.model";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  registerUser(userDetails: userDetailsVO) {
    return this.http.post("http://localhost:8080", userDetails, {});
  }
}
