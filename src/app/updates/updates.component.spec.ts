import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { UpdatesComponent } from './updates.component';
import { CmsCacheService } from '../services/cms-cache.service';
import { MockCmsCacheService } from '../services/cms-cache.service.mock';

describe('UpdatesComponent', () => {
  let component: UpdatesComponent;
  let fixture: ComponentFixture<UpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatesComponent],
      providers: [
        provideHttpClient(),
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fallback news on init', () => {
    expect(component.allNews.length).toBeGreaterThan(0);
  });
});
