import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDetailsVO } from "src/vo/userDetailsVO.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LoginCredentialsVO } from "src/vo/LoginCredentialsVO.model";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { Urls } from "src/enums/UrlMap";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  fetchRoles() {
    return this.http.get(environment.apiConfig.base_url + "allRoles");
  }
  registerUser(userDetails: UserDetailsVO): Observable<any> {
    return this.http.post(
      Urls.REGISTER,
      userDetails,
      {}
    );
  }
  authenticate(loginCredentials: LoginCredentialsVO) {
    return this.http.post(
      Urls.LOGIN,
      loginCredentials,
      {}
    );
  }
  
  logout() {
    this.cookieService.deleteAll();
    this.router.navigateByUrl('');
  }
}
