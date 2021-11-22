import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { AuthenticationService } from "../services/authentication.service";
import jwt_decode from "jwt-decode";
@Injectable()
export class HttpCalIInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var decoded: { sub: string; role: string; exp: number; iat: number } = null;
    if (this.cookieService.check("jwt")) {
      decoded = jwt_decode(this.cookieService.get("jwt"));
      console.log(decoded);
    }
    console.log(new Date().getTime());
    var time = new Date().getTime();
    // if (decoded == null || decoded.exp > time)
    //   this.authenticationService.logout();
    if (
      request.url != environment.apiConfig.base_url + "register" &&
      request.url != environment.apiConfig.base_url + "authenticate" && 
      request.url != environment.apiConfig.base_url + "allRoles"
    ) {
      let modifiedurl = request.clone({
        headers: new HttpHeaders().append(
          "Authorization",
          "Bearer " + this.cookieService.get("jwt")
        ),
      });
      return next.handle(modifiedurl);
    } else return next.handle(request);
  }
}
