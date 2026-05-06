import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HodEducationComponent } from './hod-education.component';
import { CmsCacheService } from '../../services/cms-cache.service';
import { MockCmsCacheService } from '../../services/cms-cache.service.mock';

describe('HodEducationComponent', () => {
  let component: HodEducationComponent;
  let fixture: ComponentFixture<HodEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HodEducationComponent],
      providers: [
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HodEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fallback HOD data', () => {
    expect(component.hod.name).toBe('Fredrick M . Nzavi');
  });
});
