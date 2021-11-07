import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MarksVO } from 'src/vo/marksVO';
import {RowOperation} from '../../../../enums/rowOperation'

@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data:string[][]
  @Input() colTitle:string[]
  @Input() colWidth:string[]
  @Input() rowStatus:RowOperation[] = [];
  @Input() operationAllowed: RowOperation[] = []
  @Input() originalData:MarksVO[]

  @Output() changedDataEvent = new EventEmitter();
  
  modifiedData:string[][] = []; 

  buttonList:any[] = [
    {label: "UPDATE", rowOp: RowOperation.UPDATE, classDesc:"btn btn-primary btn-sm", rowColor:"#ffff80"},
    {label: "DELETE", rowOp: RowOperation.DELETE, classDesc:"btn btn-danger btn-sm", rowColor:"#ffb3b3"},
    {label: "OBJECTION", rowOp: RowOperation.OBJECTION, classDesc:"btn btn-success btn-sm", rowColor:"#99ff99"}, 
    {label: "RESOLVE", rowOp: RowOperation.RESOLVE, classDesc:"btn btn-success btn-sm", rowColor:"#ffff80"},
    {label: "REJECTED", rowOp: RowOperation.REJECT, classDesc:"btn btn-danger btn-sm", rowColor:"#ffb3b3"},
  ]

  allowedBtnList:any[] = [];

  constructor() {  }
  
  ngOnInit() {
    console.log(this.data);
    for(let idx=0; idx<this.data.length; idx++){
      this.rowStatus.push(RowOperation.NONE)
    }
    for(let idx=0;idx<this.buttonList.length;idx++){
      if(this.operationAllowed.includes(this.buttonList[idx].rowOp)){
        this.allowedBtnList.push(this.buttonList[idx])
      }
    }
    for(let idx=0;idx<this.data.length;idx++){
      this.modifiedData.push([]);
      this.fillModifiedData(idx)      
    }    
  }

  fillModifiedData(rowId: number){
    for(let idxInner=0;idxInner<this.data[rowId].length;idxInner++){
      this.modifiedData[rowId].push(this.data[rowId][idxInner])
    }
    this.modifiedData[rowId].push(RowOperation.NONE)
  }
  getColWidth(colNo){
    return this.colWidth[colNo]
  }

  getOperationAllowed(){
    return this.operationAllowed.length > 0
  }

  btnClicked(rowNo: number, btnIdx: number){
    let len = this.modifiedData[rowNo].length
    if(this.rowStatus[rowNo] == this.allowedBtnList[btnIdx].rowOp){
      this.rowStatus[rowNo] = RowOperation.NONE
      this.modifiedData[rowNo] = [];
      this.fillModifiedData(rowNo)
      this.modifiedData[rowNo][len-1] = this.rowStatus[rowNo]
    }else if(this.rowStatus[rowNo] == RowOperation.UPDATE){
      this.rowStatus[rowNo] = this.allowedBtnList[btnIdx].rowOp
      this.modifiedData[rowNo][len-1] = this.rowStatus[rowNo]
    }else{ 
      this.rowStatus[rowNo] = this.allowedBtnList[btnIdx].rowOp
      this.modifiedData[rowNo] = [];
      this.fillModifiedData(rowNo)
      this.modifiedData[rowNo][len-1] = this.rowStatus[rowNo]
    }
  }

  isAllowed(btnIdx: number){
    return this.operationAllowed.includes(this.allowedBtnList[btnIdx].rowOp)
  }

  getBtnClass(btnIdx){
    return this.allowedBtnList[btnIdx].classDesc;
  }

  getOpacityStyle(rowNo: number, btnIdx: number){
    if(this.allowedBtnList[btnIdx].rowOp == this.rowStatus[rowNo]){
      return 1
    }
    return 0.75 
  }

  isUpdateClicked(rowNo: number){
    return this.rowStatus[rowNo] == RowOperation.UPDATE 
  }

  getRowColor(rowNo:number){
    
    for(let idx=0; idx<this.allowedBtnList.length;idx++){
      if(this.rowStatus[rowNo] == this.allowedBtnList[idx].rowOp){
        return this.allowedBtnList[idx].rowColor
      }
    }
    return null;
  }

  onChange(data:any, rowNo:number){
    this.changedDataEvent.emit(this.modifiedData)
  }

}