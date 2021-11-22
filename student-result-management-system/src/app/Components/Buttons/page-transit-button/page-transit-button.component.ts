import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-transit-button',
  templateUrl: './page-transit-button.component.html',
  styleUrls: ['./page-transit-button.component.css']
})
export class PageTransitButtonComponent implements OnInit {

  @Input() btnLabel: string;
  @Input() componentUrl: string;

  
  constructor(private router: Router) {   }
  
  navigate(): void {
    this.router.navigate([this.componentUrl])
  }
  
  ngOnInit() {}

}
