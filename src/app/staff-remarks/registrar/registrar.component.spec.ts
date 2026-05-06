import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarComponent } from './registrar.component';
import { CmsCacheService } from '../../services/cms-cache.service';
import { MockCmsCacheService } from '../../services/cms-cache.service.mock';

describe('RegistrarComponent', () => {
  let component: RegistrarComponent;
  let fixture: ComponentFixture<RegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarComponent],
      providers: [
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fallback registrar data', () => {
    expect(component.registrar.name).toBe('Dorcas M Muambi');
  });
});
