import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNavbarComponent } from './custom-navbar.component';

describe('CutomNavbarComponent', () => {
  let component: CustomNavbarComponent;
  let fixture: ComponentFixture<CustomNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
