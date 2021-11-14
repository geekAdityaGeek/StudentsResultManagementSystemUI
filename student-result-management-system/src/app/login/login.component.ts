import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { LoginCredentialsVO } from "src/vo/LoginCredentialsVO.model";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginCredentials: LoginCredentialsVO;
  constructor(
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.toastrService.success("Login Form loaded!");
    this.loginForm = new FormGroup({
      id: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  authenticate() {
    this.loginCredentials = new LoginCredentialsVO(
      this.loginForm.get("id").value,
      this.loginForm.get("password").value
    );
    this.authenticationService.authenticate(this.loginCredentials).subscribe(
      (data: any) => {
        var jwt: string = data.message;
        // console.log(data);
        this.cookieService.set("jwt", jwt, 1, "/", "", true);
        this.toastrService.success("Login Successful!");
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastrService.error("Login Failed!");
      }
    );
  }
}
function secure(
  arg0: string,
  jwt: string,
  arg2: number,
  arg3: string,
  secure: any,
  arg5: boolean
) {
  throw new Error("Function not implemented.");
}
