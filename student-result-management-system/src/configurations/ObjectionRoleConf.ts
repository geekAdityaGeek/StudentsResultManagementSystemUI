import { RoleConf } from "./roleConf";
import { UIConf } from "./uiConf";

export interface ObjectionRoleConf extends UIConf, RoleConf{
    processOperatedData(data: any): void ;
    getOperationUrl(); 
    getRequestDataForOperation();
    getObjectionData(extId: string, currPage: Number, itemsPerPage: Number);
    getViewObjectionUrl();
}