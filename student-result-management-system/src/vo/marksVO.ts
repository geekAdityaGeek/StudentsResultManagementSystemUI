import { RowOperation } from "src/enums/rowOperation";

export class MarksVO{
    constructor(
        protected rollNo: string,
        protected subjectCode: string,
        protected subjectName: string,
        protected marksObtained: number,
        protected totalMarks: number,
        protected grade: string,
        protected year: number,
        protected term: number,
        protected operation: RowOperation
    ){}

    getRollNo(){
        return this.rollNo
    }

    getSubjectCode(){
        return this.subjectCode
    }

    getSubjectName(){
        return this.subjectName
    }

    getMarksObtained(){
        return this.marksObtained
    }

    getTotalMarks(){
        return this.totalMarks
    }

    getGrade(){
        return this.grade
    }

    getTerm(){
        return this.term
    }

    getYear(){
        return this.year
    }

    getOperation(){
        return this.operation;
    }


    
}