export class QueryVO{
    constructor(
        private rollNumber : string,
        private subjectCode : string,
        private subjectName : string,
        private term: number,
        private year: number
    ){}

    getRollNumber(){
        return this.rollNumber;
    }

    getSubjectCode(){
        return this.subjectCode;
    }
    getSubjectName(){
        return this.subjectName;
    }
    getTerm(){
        return this.term;
    }
    getYear(){
        return this.year;
    }


}