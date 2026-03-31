import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOfBusinessComponent } from './school-of-business.component';

describe('SchoolOfBusinessComponent', () => {
  let component: SchoolOfBusinessComponent;
  let fixture: ComponentFixture<SchoolOfBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolOfBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolOfBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
