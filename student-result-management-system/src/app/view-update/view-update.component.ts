import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UploadService } from "../services/upload.service";
import { UpdateForm } from "./update.form";

@Component({
  selector: "app-view-update",
  templateUrl: "./view-update.component.html",
  styleUrls: ["./view-update.component.css"],
})
export class ViewUpdateComponent implements OnInit {
  bulkUpdateForm: FormGroup;
  bulkUpdateFile: File;

  constructor(
    private toastrService: ToastrService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    let bulkUpdateFormClass = new UpdateForm();
    this.bulkUpdateForm = bulkUpdateFormClass.getBulkUpdateForm();
  }

  onSelectFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0)
      this.bulkUpdateFile = event.target.files[0];
  }

  onUpdateSubmit() {
    this.uploadService.bulkUpdate(this.bulkUpdateFile).subscribe(
      (data) => {
        this.toastrService.success(data["message"], "Success");
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message, "Failed");
      }
    );
  }
}
