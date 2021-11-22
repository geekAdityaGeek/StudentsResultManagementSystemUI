import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNavButtonComponent } from './custom-nav-button.component';

describe('CustomNavButtonComponent', () => {
  let component: CustomNavButtonComponent;
  let fixture: ComponentFixture<CustomNavButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomNavButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomNavButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
