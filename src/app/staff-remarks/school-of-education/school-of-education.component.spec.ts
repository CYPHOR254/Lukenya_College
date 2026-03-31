import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOfEducationComponent } from './school-of-education.component';

describe('SchoolOfEducationComponent', () => {
  let component: SchoolOfEducationComponent;
  let fixture: ComponentFixture<SchoolOfEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolOfEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolOfEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
