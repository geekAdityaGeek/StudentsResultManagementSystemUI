import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router"


@Component({
  selector: 'custom-nav-button',
  templateUrl: './custom-nav-button.component.html',
  styleUrls: ['./custom-nav-button.component.css']
})
export class CustomNavButtonComponent implements OnInit {

  @Input() btnLabel: string;
  @Input() componentUrl: string;

  
  constructor(private router: Router) {   }
  
  navigate(): void {
    this.router.navigate([this.componentUrl])
  }
  
  ngOnInit() {}

}
