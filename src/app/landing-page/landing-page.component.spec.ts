import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LandingPageComponent } from './landing-page.component';
import { CmsCacheService } from '../services/cms-cache.service';
import { MockCmsCacheService } from '../services/cms-cache.service.mock';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [
        provideHttpClient(),
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fallback slides on init', () => {
    expect(component.slides.length).toBeGreaterThan(0);
    expect(component.slides[0].title).toBe('Carpentry & Woodwork Lab');
  });

  it('should have fallback FAQs on init', () => {
    expect(component.faqs.length).toBe(4);
  });

  it('should have fallback programs on init', () => {
    expect(component.programs.length).toBeGreaterThan(0);
  });
});
