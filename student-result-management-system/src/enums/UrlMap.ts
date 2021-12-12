import { environment } from "src/environments/environment";

export class Urls{

    static REGISTER = environment.apiConfig.base_url + "registration";
    static LOGIN = environment.apiConfig.base_url + "authentication";
    static FETCH_TERMS = environment.apiConfig.base_url + "moderator/uniqueTerms";
    static FETCH_SUB_CODES = environment.apiConfig.base_url + "moderator/listOfSubjCodeName";
    static FETCH_ALLOWED_ACTIONS = environment.apiConfig.base_url+"actionsByRole/";
    static GET_USER_DETAILS = environment.apiConfig.base_url+"user/details";
    static GET_MARKS = environment.apiConfig.base_url + "marks";
    static MARKS_WITH_PAGINATION = environment.apiConfig.base_url+"marks/pagination";
    static MOD_SINGLE_UPLOAD = environment.apiConfig.base_url + "moderator/singleUpload";
    static MOD_BULK_UPLOAD = environment.apiConfig.base_url + "moderator/bulkUpload";
    static MOD_BULK_UPDATE = environment.apiConfig.base_url + "moderator/bulkUpdate";   
    static FETCH_ALL_ROLES = environment.apiConfig.base_url + "allRoles";
    static ROLE_ADDITION = environment.apiConfig.base_url + "roleAddition";
    static SAVE_ACTION = environment.apiConfig.base_url + "action/save";
    static SUBJECT_ADDITION = environment.apiConfig.base_url + "subjectAddition";
    static RAISE_OBJECTION = environment.apiConfig.base_url + "objection/raiseObjection";
    static RESOLVE_OBJECTION = environment.apiConfig.base_url + "objection/objectionResolution";
    static FETCH_STUDENT_OBJECTIONS = environment.apiConfig.base_url + "objection/studentObjections";
    static FETCH_MODERATOR_OBJECTIONS = environment.apiConfig.base_url + "objection/modObjections";
    static UPDATE_MARKS = environment.apiConfig.base_url + "moderator/updateMarks";
    static GET_RESULT_PDF = environment.apiConfig.base_url + "download/result/pdf";
    static GET_ALL_OBJECTIONS = environment.apiConfig.base_url + "objection/all";
}