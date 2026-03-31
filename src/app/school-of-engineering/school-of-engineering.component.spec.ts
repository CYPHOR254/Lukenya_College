import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOfEngineeringComponent } from './school-of-engineering.component';

describe('SchoolOfEngineeringComponent', () => {
  let component: SchoolOfEngineeringComponent;
  let fixture: ComponentFixture<SchoolOfEngineeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolOfEngineeringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolOfEngineeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
