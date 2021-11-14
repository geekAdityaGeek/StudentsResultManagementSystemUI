export class Upload {
  private _rollNo: string;
  private _term: number;
  private _subjectCode: string;
  private _subjectName: string;
  private _year: number;
  private _marksObtained: number;
  private _totalMarks: number;
  private _grade: string;
  constructor(
    private rollNo: string,
    private term: number,
    private subjectCode: string,
    private subjectName: string,
    private year: number,
    private marksObtained: number,
    private totalMarks: number,
    private grade: string
  ) {}
}
