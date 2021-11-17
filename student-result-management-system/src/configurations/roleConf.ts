import { RowOperation } from "src/enums/rowOperation";

export interface RoleConf {
    getAllowedOperation():RowOperation[];    
}