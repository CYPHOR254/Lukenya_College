import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { SchoolOfEducationComponent } from './school-of-education.component';
import { CmsCacheService } from '../services/cms-cache.service';
import { MockCmsCacheService } from '../services/cms-cache.service.mock';

describe('SchoolOfEducationComponent', () => {
  let component: SchoolOfEducationComponent;
  let fixture: ComponentFixture<SchoolOfEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolOfEducationComponent],
      providers: [
        provideHttpClient(),
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolOfEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fallback programs', () => {
    expect(component.programs.length).toBeGreaterThan(0);
  });
});
