import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { userDetailsVO } from "../../../vo/userDetailsVO.model";
import {
  NgbModule,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
@Component({
  selector: "app-registerform",
  templateUrl: "./registerform.component.html",
  styleUrls: ["./registerform.component.css"],
})
export class RegisterformComponent implements OnInit {
  registerform: FormGroup;
  userDetails: userDetailsVO;
  parserformatter: NgbDateParserFormatter;
  match(control: FormControl) {
    if (control.get("password").value !== control.get("confirmPassword").value)
      return { mismatch: true };
    else return null;
  }
  constructor(
    private authenticationService: AuthenticationService,
    private config: NgbDatepickerConfig,
    private router: Router
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
    this.registerform = new FormGroup(
      {
        firstname: new FormControl("", Validators.required),
        lastname: new FormControl("", Validators.required),
        gender: new FormControl("", Validators.required),
        contactno: new FormControl("", [
          Validators.required,
          Validators.pattern(new RegExp("^[0-9]{10}$")),
        ]),
        role: new FormControl("", Validators.required),
        id: new FormControl("", [
          Validators.required,
          Validators.pattern(new RegExp("[A-Z]{3}[0-9]{8}")),
        ]),
        address: new FormControl("", Validators.required),
        dob: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
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
    this.userDetails = new userDetailsVO(
      this.registerform.get("firstname").value,
      this.registerform.get("lastname").value,
      this.registerform.get("gender").value,
      this.registerform.get("contactno").value,
      this.registerform.get("role").value,
      this.registerform.get("id").value,
      this.registerform.get("address").value,
      this.registerform.get("dob").value,
      this.registerform.get("email").value,
      this.registerform.get("password").value
    );

    this.authenticationService.registerUser(this.userDetails).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.error();
      }
    );
  }
}
