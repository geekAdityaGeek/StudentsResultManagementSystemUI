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
  bulkUploadForm: FormGroup;
  Terms: string[] = [];
  SubjectCodes: string[] = [];
  Years: string[] = [];
  marksFlag: boolean = true;
  file: File;

  constructor(
    private toastrService: ToastrService,
    private uploadService: UploadService
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
      (error) => {
        this.toastrService.error("Subject Codes Fetching Failed", "Failed");
      }
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
      (error) => {
        this.toastrService.error("Terms Fetching Failed", "Failed");
      }
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
            "Single Upload of Marks Successful",
            "Success"
          );
        },
        (error) => {}
      );
    } else {
      this.toastrService.error(
        "Single Upload of Marks Failed. Please check the file.",
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
        this.toastrService.success(
          "Bulk Upload of Marks Successful",
          "Success"
        );
      },
      (error) => {
        this.toastrService.error("Bulk Uplaod of Marks Failed", "Failed");
      }
    );
  }
}
