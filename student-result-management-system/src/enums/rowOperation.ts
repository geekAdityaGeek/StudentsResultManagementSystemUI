import { mapToMapExpression } from "@angular/compiler/src/render3/util";

export enum RowOperation {
    NONE = "",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    RESOLVE = "RESOLVE",
    REJECT = "REJECT",
    OBJECTION = "OBJECTION",
    INSERT = "INSERT"
  }
  