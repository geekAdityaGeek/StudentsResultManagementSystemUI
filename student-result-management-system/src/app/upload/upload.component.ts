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
import { HttpErrorResponse } from "@angular/common/http";
import { CommonService } from "../services/common.service";
import { Actions } from "src/enums/actionEnums";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;
  bulkUploadForm: FormGroup;
  Terms: string[] = [];
  SubjectCodes: string[] = [];
  Years: string[] = [];
  marksFlag: boolean = true;
  file: File;

  constructor(
    private toastrService: ToastrService,
    private uploadService: UploadService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    let uploadFormClass = new UploadForm();
    this.uploadForm = uploadFormClass.getUploadForm();
    this.bulkUploadForm = uploadFormClass.getBulkUUploadForm();
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
    this.commonService.fetchSubjectCodes().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.SubjectCodes.push(data[i]);
        }
        this.toastrService.success(
          "Subject Codes Fetched Successful",
          "Success"
        );
      },
      (error) => {
        this.toastrService.error("Subject Codes Fetching Failed", "Failed");
      }
    );
  }

  fetchTerms() {
    this.commonService.fetchTerms().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.Terms.push(data[i]);
        }
        this.toastrService.success("Terms Fetched Successful", "Success");
      },
      (error) => {
        this.toastrService.error("Terms Fetching Failed", "Failed");
      }
    );
  }

  onSubmit() {
    let rollNo = this.uploadForm.get("rollNo").value;
    let term = Number(this.uploadForm.get("term").value);
    let subjectCode: string = this.uploadForm
      .get("subjectCode")
      .value.toString()
      .split(",")[0];
    let subjectName: string = this.uploadForm
      .get("subjectCode")
      .value.toString()
      .split(",")[1];
    let year = Number(this.uploadForm.get("year").value);
    let marksObt = Number(this.uploadForm.get("marksObtained").value);
    let totMarks = Number(this.uploadForm.get("totMarks").value);
    let grade = this.uploadForm.get("grade").value;
    if (marksObt <= totMarks) {
      let uploadObj = new Upload(
        rollNo,
        term,
        subjectCode,
        subjectName,
        year,
        marksObt,
        totMarks,
        grade
      );
      this.uploadService.uploadMarks(uploadObj).subscribe(
        (data: any) => {
          this.toastrService.success(data["message"], "Success");
          this.uploadForm.reset();
        },
        (error: HttpErrorResponse) => {
          this.toastrService.error(error.error.message, "Failed");
        }
      );
    } else {
      this.toastrService.error(
        "Marks Obtained cannot be gretaer than Total Marks",
        "Failed"
      );
    }
  }

  verifyMarks() {
    let marksObt = Number(this.uploadForm.get("marksObtained").value);
    let totMarks = Number(this.uploadForm.get("totMarks").value);
    if (
      marksObt != undefined &&
      totMarks != undefined &&
      marksObt <= totMarks
    ) {
      this.marksFlag = false;
    } else {
      this.marksFlag = true;
    }
  }

  onSelectFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0)
      this.file = event.target.files[0];
  }

  onBulkSubmit() {
    this.uploadService.bulkUpload(this.file).subscribe(
      (data) => {
        console.log(data);
        this.toastrService.success(data["message"], "Success");
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message, "Failed");
      }
    );
  }

  isBulkUploadAllowed(){
    let allowedOperation = this.commonService.getActionList()
    return allowedOperation.includes(Actions.BULK_UPLOAD)
  }

  isSingleUploadAllowed(){
    let allowedOperation = this.commonService.getActionList()
    return allowedOperation.includes(Actions.UPLOAD)
  }
}
