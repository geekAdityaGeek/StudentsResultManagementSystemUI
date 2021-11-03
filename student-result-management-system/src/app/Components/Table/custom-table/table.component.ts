import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data:any[]
  @Input() colTitle:any[]

  constructor() { }

  ngOnInit() {
    console.log(this.data)
    console.log(this.colTitle)
  }

}
