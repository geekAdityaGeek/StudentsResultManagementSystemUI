import { UploadForm } from "./upload.form";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import {
  NgbModule,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { Upload } from "./upload.model";
import { ToastrService } from "ngx-toastr";
import { UploadService } from "./../services/upload.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;
  Terms: string[] = [];
  SubjectCodes: string[] = [];
  Years: string[] = [];
  marksFlag: boolean = true;

  constructor(
    private toastrService: ToastrService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    let uploadFormClass = new UploadForm();
    this.uploadForm = uploadFormClass.getUploadForm();
    console.log(this.uploadForm);
    this.fetchTerms();
    this.fetchSubjectCodes();
    this.fetchYears();
  }

  fetchYears() {
    let date = new Date();
    let year = date.getFullYear();
    for (let i = 0; i <= 10; i++) {
      let y = year + i;
      this.Years.push(y.toString());
    }
  }

  fetchSubjectCodes() {
    this.uploadService.fetchSubjectCodes().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.SubjectCodes.push(data[i]);
        }
        this.toastrService.success(
          "Subject Codes Fetched Successful",
          "Success"
        );
      },
      (error) => {}
    );
  }

  fetchTerms() {
    this.uploadService.fetchTerms().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.Terms.push(data[i]);
        }
        this.toastrService.success("Terms Fetched Successful", "Success");
      },
      (error) => {}
    );
  }

  onSubmit() {
    let rollNo = this.uploadForm.get("rollNo").value;
    let term = this.uploadForm.get("term").value;
    let subjectCode: string = this.uploadForm
      .get("subjectCode")
      .value.toString()
      .split("-")[0];
    let year = this.uploadForm.get("year").value;
    let marksObt = Number(this.uploadForm.get("marksObtained").value);
    let totMarks = Number(this.uploadForm.get("totMarks").value);
    if (marksObt <= totMarks) {
      let uploadObj = new Upload(
        rollNo,
        term,
        subjectCode,
        year,
        marksObt,
        totMarks
      );
      this.uploadService.uploadMarks(uploadObj).subscribe(
        (data: any) => {
          this.toastrService.success(
            "Bulk Upload of Marks Successful",
            "Success"
          );
        },
        (error) => {}
      );
    } else {
      throw new Error("Marks Obtained Should be less then Total Marks");
    }
  }

  verifyMarks() {
    let marksObt = Number(this.uploadForm.get("marksObtained").value);
    let totMarks = Number(this.uploadForm.get("totMarks").value);
    if (marksObt <= totMarks) {
      this.marksFlag = false;
    } else {
      this.marksFlag = true;
    }
  }
}
