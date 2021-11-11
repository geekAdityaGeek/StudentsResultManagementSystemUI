export class Upload {
  private _rollNo: string;
  private _term: string;
  private _subjectCode: string;
  private _year: string;
  private _marksObt: number;
  private _totalMarks: number;
  constructor(private rollNo: string,
    private term: string,
    private subjectCode: string,
    private year: string,
    private marksObt: number,
    private totalMarks: number,) {}
}
