import { FormGroup, FormControl, Validators } from "@angular/forms";

export class UploadForm {
  uploadForm = new FormGroup({
    rollNo: new FormControl("", [
      Validators.required,
      Validators.pattern(new RegExp("[A-Z]{3}[0-9]{7}")),
    ]),
    term: new FormControl("", Validators.required),
    subjectCode: new FormControl("", Validators.required),
    year: new FormControl("", Validators.required),
    marksObtained: new FormControl("", [
      Validators.required,
      Validators.pattern(new RegExp("[0-9]{3}")),
      Validators.maxLength(3),
    ]),
    totMarks: new FormControl("", [
      Validators.required,
      Validators.pattern(new RegExp("[0-9]{3}")),
      Validators.maxLength(3),
    ]),
  });

  public getUploadForm(): FormGroup {
    return this.uploadForm;
  }

  bulkUploadForm = new FormGroup({
    file: new FormControl(null, Validators.required),
  });

  public getBulkUUploadForm() {
    return this.bulkUploadForm;
  }
}
