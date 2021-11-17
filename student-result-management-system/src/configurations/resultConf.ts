import { UIConf } from "./uiConf";

export abstract class ResultConf implements UIConf{
    abstract processOperatedData(data: any): void ;
    abstract getOperationUrl(): string 
    abstract getRequestDataForOperation() ;

}