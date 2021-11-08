import { RowOperation } from "src/enums/rowOperation";

export interface MarksVO{
    rollNumber: string,
    subjectCode: string,
    subjectName: string,
    marksObtained: number,
    totalMarks: number,
    grade: string,
    year: number,
    term: number,
    state: RowOperation
}