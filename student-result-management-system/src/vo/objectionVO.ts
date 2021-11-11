import { RowOperation } from "src/enums/rowOperation";
import { MarksVO } from "./marksVO";

export class ObjectionVO extends MarksVO{
    constructor(
        protected rollNumber: string,
        protected subjectCode: string,
        protected subjectName: string,
        protected marksObtained: number,
        protected totalMarks: number,
        protected grade: string,
        protected year: number,
        protected term: number,
        protected comments: string,
        protected state: RowOperation
    ){
        super(rollNumber, subjectCode, subjectName, marksObtained, totalMarks, grade, year, term, state)
        this.comments = comments;
    }
    
}