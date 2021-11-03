import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTransitButtonComponent } from './page-transit-button.component';

describe('PageTransitButtonComponent', () => {
  let component: PageTransitButtonComponent;
  let fixture: ComponentFixture<PageTransitButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTransitButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTransitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
