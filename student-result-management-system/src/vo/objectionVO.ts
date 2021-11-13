import { RowOperation } from "src/enums/rowOperation";
import { MarksVO } from "./marksVO";

export class ObjectionVO extends MarksVO{
    constructor(
        protected rollNo: string,
        protected subjectCode: string,
        protected subjectName: string,
        protected marksObtained: number,
        protected totalMarks: number,
        protected grade: string,
        protected year: number,
        protected term: number,
        protected comments: string,
        protected operation: RowOperation
    ){
        super(rollNo, subjectCode, subjectName, marksObtained, totalMarks, grade, year, term, operation)
        this.comments = comments;
    }

    getComments(){
        return this.comments;
    }
    
}