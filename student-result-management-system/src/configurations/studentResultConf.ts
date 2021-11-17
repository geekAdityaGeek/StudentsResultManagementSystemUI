import { HttpParams } from "@angular/common/http";
import { CommonService } from "src/app/services/common.service";
import { RowOperation } from "src/enums/rowOperation";
import { environment } from "src/environments/environment";
import { ResultRoleConf } from "./ResultRoleConf";

export class StudentResultConf implements ResultRoleConf{

    objectedMarks = []

    constructor(private commonService: CommonService){  }

    public processOperatedData(changedData: any): void {   
        this.objectedMarks = []
        for(let idx=0; idx<changedData.length; idx++){
            let marks = this.commonService.mapMarksArrayToMarksVO(changedData[idx])
            if(marks.getOperation() == RowOperation.OBJECTION){
                this.objectedMarks.push(marks)
            }
        }
    }

    public getAllowedOperation(): RowOperation[] {
        let allowedOperationList : RowOperation[] = [];
        allowedOperationList.push(RowOperation.NONE);
        allowedOperationList.push(RowOperation.DOWNLOAD_RESULT);
        allowedOperationList.push(RowOperation.OBJECTION);
        return allowedOperationList;
    }

    public getResultDownloadLink(queryVO : any) : string{
        let params = new HttpParams()
        .append("rollNumber", queryVO["rollNumber"])
        .append("subjectode", queryVO["subjectCode"])
        .append("term", queryVO["term"].toString())
        .append("year", queryVO["year"].toString())
        
        return environment.apiConfig.base_url + "download/result/pdf?"+params.toString()
    }

    public getOperationUrl(){
        return "objection/raiseObjection";
    }
    
    getRequestDataForOperation(){
        return this.objectedMarks;      
    }

}