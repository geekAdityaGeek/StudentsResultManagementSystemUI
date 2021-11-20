import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ModeratorResultConf } from "src/configurations/moderatorResultConf";
import { ResultRoleConf } from "src/configurations/ResultRoleConf";
import { StudentResultConf } from "src/configurations/studentResultConf";
import { RowOperation } from "src/enums/rowOperation";
import { environment } from "src/environments/environment";
import { MarksVO } from "src/vo/marksVO";
import { QueryVO } from "src/vo/queryVO";
import { CommonService } from "../services/common.service";
import { ResultService } from "../services/result.service";
import { CookieService } from "ngx-cookie-service";
import jwt_decode from "jwt-decode";

@Component({
  selector: "results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit {
  columnHeading: string[] = [
    "ROLL NUMBER",
    "SUBJECT",
    "YEAR",
    "TERM",
    "MARKS",
    "TOTAL MARKS",
    "GRADE",
  ];
  colWidth: string[] = ["15%", "30%", "10%", "10%", "10%", "10%", "10%"];
  disabledInput: boolean[] = [true, true, true, true, false, false, false];
  resultData: MarksVO[];
  arrayResultData: string[][];
  backBtnLabel: string = "Back";
  backUrl: string = "view-update";
  submitBtnLabel: string = "Submit";
  userConf: string = "user-conf";
  otherPageResult: string = "results";
  prevPageBtnLabel: string = "Previous";
  nextPageBtnLabel: string = "Next";
  operationList: RowOperation[] = [];
  queryVO: QueryVO;
  currPage: number = 0;
  configurer: ResultRoleConf;
  totalPage: number;
  decoded: { sub: string; role: string; exp: number; iat: number } = null;
    

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private resultService: ResultService,
    private toastrService: ToastrService,
    private injector: Injector,
    private cookieService: CookieService
  ) {
    if (this.cookieService.check("jwt")) {
      this.decoded = jwt_decode(this.cookieService.get("jwt"));
    }
    if (this.decoded.role === "student") {
      this.configurer = new StudentResultConf(this.commonService);
    } else {
      this.configurer = new ModeratorResultConf(this.commonService);
    }
    let responseData = <any>this.router.getCurrentNavigation().extras.state;
    if(!responseData){
      this.commonService.loadComponent("home", null)
    }
    let data = responseData["marks"];
    this.resultData = this.commonService.mapToMarksData(data["marksVOList"]);
    this.totalPage = data["totalPage"];
    this.currPage = data["currentPage"];
    this.queryVO = <QueryVO>responseData["query"];
    if (this.resultData == undefined) this.router.navigateByUrl("home");
    this.convertToResultArray();
    this.operationList = this.configurer.getAllowedOperation();
  }

  convertToResultArray() {
    this.arrayResultData = [];
    console.log(this.resultData);
    for (let i = 0; i < this.resultData.length; i++) {
      this.arrayResultData.push([]);
      console.log(typeof this.resultData[i]);
      this.arrayResultData[i].push(this.resultData[i].getRollNo());
      this.arrayResultData[i].push(
        this.resultData[i].getSubjectCode() +
          ":" +
          this.resultData[i].getSubjectName()
      );
      this.arrayResultData[i].push(this.resultData[i].getYear().toString());
      this.arrayResultData[i].push(this.resultData[i].getTerm().toString());
      this.arrayResultData[i].push(
        this.resultData[i].getMarksObtained().toString()
      );
      this.arrayResultData[i].push(
        this.resultData[i].getTotalMarks().toString()
      );
      this.arrayResultData[i].push(this.resultData[i].getGrade());
      this.arrayResultData[i].push(RowOperation.NONE);
    }
  }

  ngOnInit() {}

  operatedDataProcessing(operatedData: any) {
    this.configurer.processOperatedData(operatedData);
  }

  dataExtractor = () => {
    let finalData = {};
    finalData["columnHeading"] = [
      "ROLL NUMBER",
      "SUBJECT",
      "YEAR",
      "TERM",
      "MARKS",
      "TOTAL MARKS",
      "GRADE",
      "OPERATION",
    ];
    finalData["colWidth"] = ["15%", "30%", "10%", "10%", "10%", "10%", "10%"];
    finalData["savingUrl"] = this.configurer.getOperationUrl();
    finalData["data"] = this.configurer.getRequestDataForOperation();
    return finalData;
  };

  getDownloadLink() {
    return this.configurer.getResultDownloadLink(this.queryVO);
  }

  previousPage() {
    this.resultService
      .getPreviousPage(
        this.currPage,
        environment.apiConfig.items_per_page,
        this.queryVO
      )
      .subscribe(
        (data) => {
          this.totalPage = data["totalPage"];
          if(this.totalPage == 0){
            this.currPage = -1;
          }
          this.resultData = this.commonService.mapToMarksData(
            data["marksVOList"]
          );
          this.convertToResultArray();
          this.currPage -= 1;
          
        },
        (error) => {
          debugger;
          this.toastrService.warning("This is the first page!!");
        }
      );
  }

  nextPage() {
    this.resultService
      .getNextPage(
        this.currPage,
        environment.apiConfig.items_per_page,
        this.queryVO
      )
      .subscribe(
        (data) => {
          this.totalPage = data["totalPage"];
          if(this.totalPage == 0){
            this.currPage = +1;
          }
          this.resultData = this.commonService.mapToMarksData(
            data["marksVOList"]
          );
          this.convertToResultArray();
          this.currPage += 1;
          this.totalPage = data["totalPage"];
        },
        (error) => {
          debugger;
          this.toastrService.warning("No More Pages Present!!");
        }
      );
  }
}
