import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodEducationComponent } from './hod-education.component';

describe('HodEducationComponent', () => {
  let component: HodEducationComponent;
  let fixture: ComponentFixture<HodEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HodEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
