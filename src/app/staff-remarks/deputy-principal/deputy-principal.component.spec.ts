import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeputyPrincipalComponent } from './deputy-principal.component';
import { CmsCacheService } from '../../services/cms-cache.service';
import { MockCmsCacheService } from '../../services/cms-cache.service.mock';

describe('DeputyPrincipalComponent', () => {
  let component: DeputyPrincipalComponent;
  let fixture: ComponentFixture<DeputyPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeputyPrincipalComponent],
      providers: [
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeputyPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fallback deputy data', () => {
    expect(component.deputy.name).toBe('Mr Patrick Mutua');
  });
});
