import { environment } from "src/environments/environment";

export class Urls{

    static REGISTER = environment.apiConfig.base_url + "register";
    static LOGIN = environment.apiConfig.base_url + "authenticate";
    static FETCH_TERMS = environment.apiConfig.base_url + "moderator/getUniqueTerms";
    static FETCH_SUB_CODES = environment.apiConfig.base_url + "moderator/getListSubjCodeName";
    static FETCH_ALLOWED_ACTIONS = environment.apiConfig.base_url+"actionsByRole/";
    static GET_USER_DETAILS = environment.apiConfig.base_url+"user/details";
    static GET_MARKS = environment.apiConfig.base_url + "marks";
    static MARKS_WITH_PAGINATION = environment.apiConfig.base_url+"getMarks/pagination";
    static MOD_SINGLE_UPLOAD = environment.apiConfig.base_url + "moderator/singleUpload";
    static MOD_BULK_UPLOAD = environment.apiConfig.base_url + "moderator/bulkUpload";
    static MOD_BULK_UPDATE = environment.apiConfig.base_url + "moderator/bulkUpdate";
}