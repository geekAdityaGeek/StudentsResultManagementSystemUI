import { RowOperation } from "src/enums/rowOperation";

export class MarksVO{
    constructor(
        protected rollNumber: string,
        protected subjectCode: string,
        protected subjectName: string,
        protected marksObtained: number,
        protected totalMarks: number,
        protected grade: string,
        protected year: number,
        protected term: number,
        protected state: RowOperation
    ){}

    getRollNumber(){
        return this.rollNumber
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

    getState(){
        return this.state
    }


    
}