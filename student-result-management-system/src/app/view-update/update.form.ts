import { FormControl, FormGroup, Validators } from "@angular/forms";

export class UpdateForm {
  bulkUpdateForm = new FormGroup({
    updateFile: new FormControl(null, Validators.required),
  });

  public getBulkUpdateForm() {
    return this.bulkUpdateForm;
  }
}
