import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringRemarksComponent } from './engineering-remarks.component';

describe('EngineeringRemarksComponent', () => {
  let component: EngineeringRemarksComponent;
  let fixture: ComponentFixture<EngineeringRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineeringRemarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineeringRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
