import { CommonService } from "src/app/services/common.service";
import { ObjectionService } from "src/app/services/objection.service";
import { RowOperation } from "src/enums/rowOperation";
import { ObjectionRoleConf } from "./ObjectionRoleConf";

export class StudentObjectionConf implements ObjectionRoleConf {

    constructor(private commonService: CommonService, private objectionService: ObjectionService){}


    getObjectionData(extId: string, currPage:number, itemsPerPage:number) {
        return this.objectionService.fetchObjection(extId, currPage, itemsPerPage, this.getViewObjectionUrl());
    }

    processOperatedData(changedData: any): void {}

    getAllowedOperation(): RowOperation[] {
        let allowedOperationList : RowOperation[] = [];
        allowedOperationList.push(RowOperation.NONE);
        return allowedOperationList;
    }

    getRequestDataForOperation(){ }

    getOperationUrl(){ }  

    public getViewObjectionUrl(){
        return "objection/studentObjections"
    }
}