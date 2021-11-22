import { ToastrService } from "ngx-toastr";
import { CommonService } from "src/app/services/common.service";
import { RowOperation } from "src/enums/rowOperation";
import { ResultRoleConf } from "./ResultRoleConf";

export class ModeratorResultConf implements ResultRoleConf{

    updatedMarks = [];
    deletedMarks = [];

    constructor(private commonService: CommonService){  }

    public processOperatedData(changedData: any): void {  
        this.updatedMarks = [];
        this.deletedMarks = [];
        for(let idx=0; idx<changedData.length; idx++){
            let marks = this.commonService.mapMarksArrayToMarksVO(changedData[idx])            
            if(marks.getOperation() == RowOperation.UPDATE){
                this.updatedMarks.push(marks)
            }else if(marks.getOperation() == RowOperation.DELETE){
                this.deletedMarks.push(marks)
            }
        }
    }

    public getAllowedOperation(): RowOperation[] {
        let allowedOperationList : RowOperation[] = [];
        allowedOperationList.push(RowOperation.NONE);
        allowedOperationList.push(RowOperation.DELETE)
        allowedOperationList.push(RowOperation.UPDATE)
        return allowedOperationList;
    }

    public getResultDownloadLink(queryVO : any) : string{
        return "#"
    }
    
    public getOperationUrl(){
        return "moderator/updateMarks";
    }

    public getRequestDataForOperation(){
        let resultData = []
        resultData = resultData.concat(this.updatedMarks);
        resultData = resultData.concat(this.deletedMarks);
        return resultData;
    }

}