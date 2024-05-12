import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnPercentComponent } from './return-percent.component';

describe('ReturnPercentComponent', () => {
  let component: ReturnPercentComponent;
  let fixture: ComponentFixture<ReturnPercentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnPercentComponent]
    });
    fixture = TestBed.createComponent(ReturnPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
