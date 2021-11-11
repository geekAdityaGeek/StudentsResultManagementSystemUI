export class QueryVO{
    constructor(
        private rollNumber : string,
        private subjectCode : string,
        private subjectName : string,
        private term: number,
        private year: number
    ){}
}