import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserDetailsVO } from "../../../vo/userDetailsVO.model";
import {
  NgbModule,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-registerform",
  templateUrl: "./registerform.component.html",
  styleUrls: ["./registerform.component.css"],
})
export class RegisterformComponent implements OnInit {
  registerform: FormGroup;
  Roles = [];
  userDetails: UserDetailsVO;
  parserformatter: NgbDateParserFormatter;
  match(control: FormControl) {
    if (control.get("password").value !== control.get("confirmPassword").value)
      return { mismatch: true };
    else return null;
  }
  constructor(
    private authenticationService: AuthenticationService,
    private config: NgbDatepickerConfig,
    private router: Router,
    private toastrService: ToastrService,
    private parserFormatter: NgbDateParserFormatter
  ) {
    let date = new Date();
    config.maxDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    config.minDate = { year: 1900, month: 1, day: 1 };
  }

  ngOnInit() {
    this.toastrService.success("Registration Form loaded!");
    this.authenticationService.fetchRoles().subscribe(
      (data: any) => {
        // console.log(data);
        for (var i = 0; i < data.length; i++) this.Roles.push(data[i]);
        this.toastrService.success("Roles fetched successfully!");
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
        this.toastrService.error("Role not fetched successfully!");
      }
    );
    this.registerform = new FormGroup(
      {
        firstname: new FormControl("", Validators.required),
        lastname: new FormControl("", Validators.required),
        gender: new FormControl("", Validators.required),
        contactno: new FormControl("", [
          Validators.required,
          Validators.pattern(new RegExp("^[0-9]{10}$")),
        ]),
        role: new FormControl(this.Roles[0], Validators.required),
        id: new FormControl("", [
          Validators.required,
          Validators.pattern(new RegExp("(IMT|MT|PH|DT|MOD)[0-9]{7}")),
        ]),
        address: new FormControl("", Validators.required),
        dob: new FormControl("", Validators.required),
        email: new FormControl("", [
          Validators.required,
          Validators.email,
          Validators.pattern(new RegExp("^.+@iiitb.org$")),
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.pattern(
            new RegExp(
              "(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*-])(?=.{8,})"
            )
          ),
        ]),
        confirmPassword: new FormControl("", Validators.required),
      },
      this.match
    );
  }

  goHome = function () {
    this.router.navigateByUrl("/home");
  };
  onSubmit() {
    const name: string =
      this.registerform.get("firstname").value +
      " " +
      this.registerform.get("lastname").value;
    this.userDetails = new UserDetailsVO(
      name,
      this.registerform.get("gender").value,
      this.registerform.get("contactno").value,
      this.registerform.get("role").value,
      this.registerform.get("id").value,
      this.registerform.get("address").value,
      this.parserFormatter.format(this.registerform.controls["dob"].value),
      this.registerform.get("email").value,
      this.registerform.get("password").value
    );

    this.authenticationService.registerUser(this.userDetails).subscribe(
      (data: any) => {
        console.log(data);
        this.toastrService.success("Registration Successful!");
        this.registerform.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastrService.error(
          error.error.message,
          "Registration Unsuccessful!"
        );
      }
    );
  }
}
