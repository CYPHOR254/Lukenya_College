import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { SchoolOfEngineeringComponent } from './school-of-engineering.component';
import { CmsCacheService } from '../services/cms-cache.service';
import { MockCmsCacheService } from '../services/cms-cache.service.mock';

describe('SchoolOfEngineeringComponent', () => {
  let component: SchoolOfEngineeringComponent;
  let fixture: ComponentFixture<SchoolOfEngineeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolOfEngineeringComponent],
      providers: [
        provideHttpClient(),
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolOfEngineeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fallback programmes', () => {
    expect(component.programmes.length).toBeGreaterThan(0);
  });
});
