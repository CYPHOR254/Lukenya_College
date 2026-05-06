import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { SchoolOfBusinessComponent } from './school-of-business.component';
import { CmsCacheService } from '../services/cms-cache.service';
import { MockCmsCacheService } from '../services/cms-cache.service.mock';

describe('SchoolOfBusinessComponent', () => {
  let component: SchoolOfBusinessComponent;
  let fixture: ComponentFixture<SchoolOfBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolOfBusinessComponent],
      providers: [
        provideHttpClient(),
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolOfBusinessComponent);
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
