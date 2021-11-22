import { RoleConf } from "./roleConf";
import { UIConf } from "./uiConf";

export interface ResultRoleConf extends RoleConf, UIConf{
    processOperatedData(data:any):  void;
    getOperationUrl(): string;
    getRequestDataForOperation(): any;
    getResultDownloadLink(data : any) : string;
}