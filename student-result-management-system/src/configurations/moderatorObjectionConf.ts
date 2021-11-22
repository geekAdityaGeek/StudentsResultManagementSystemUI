import { CommonService } from "src/app/services/common.service";
import { ObjectionService } from "src/app/services/objection.service";
import { RowOperation } from "src/enums/rowOperation";
import { ObjectionVO } from "src/vo/objectionVO";
import { ObjectionRoleConf } from "./ObjectionRoleConf";

export class ModeratorObjectionConf implements ObjectionRoleConf{

    rejectedObjections:ObjectionVO[] = []
    resolvedObjections:ObjectionVO[] = []

    constructor(private commonService: CommonService, private objectionService: ObjectionService){}


    getObjectionData(extId: string, currPage: Number, itemsPerPage: Number) {
        return this.objectionService.fetchObjection(extId, currPage, itemsPerPage,this.getViewObjectionUrl());
    }
    
    getAllowedOperation(): RowOperation[] {
        let allowedOperationList : RowOperation[] = [];
        allowedOperationList.push(RowOperation.NONE);
        allowedOperationList.push(RowOperation.RESOLVE);
        allowedOperationList.push(RowOperation.REJECT)
        return allowedOperationList;
    }

    public processOperatedData(changedData: any): void {   
        this.rejectedObjections=[];
        this.resolvedObjections=[];
        for(let idx=0; idx<changedData.length; idx++){
            let objection = this.commonService.mapObjectionArrayToObjectionVO(changedData[idx])
            if(objection.getOperation() == RowOperation.RESOLVE){
                this.rejectedObjections.push(objection)
            }else if(objection.getOperation() == RowOperation.REJECT){
                this.resolvedObjections.push(objection)
            }
        }
    }

    public getRequestDataForOperation(){
        let resultData = []
        resultData = resultData.concat(this.rejectedObjections);
        resultData = resultData.concat(this.resolvedObjections);
        return resultData;
    }

    public getOperationUrl(){
        return "objection/resolveObjection";
    }

    public getViewObjectionUrl(){
        return "objection/modObjections"
    }

}