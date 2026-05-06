import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EngineeringRemarksComponent } from './engineering-remarks.component';
import { CmsCacheService } from '../../services/cms-cache.service';
import { MockCmsCacheService } from '../../services/cms-cache.service.mock';

describe('EngineeringRemarksComponent', () => {
  let component: EngineeringRemarksComponent;
  let fixture: ComponentFixture<EngineeringRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineeringRemarksComponent],
      providers: [
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EngineeringRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fallback HOD data', () => {
    expect(component.hod.name).toBe('Stephen Mutunga');
  });
});
