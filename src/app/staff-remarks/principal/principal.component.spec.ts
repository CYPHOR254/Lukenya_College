import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalComponent } from './principal.component';
import { CmsCacheService } from '../../services/cms-cache.service';
import { MockCmsCacheService } from '../../services/cms-cache.service.mock';

describe('PrincipalComponent', () => {
  let component: PrincipalComponent;
  let fixture: ComponentFixture<PrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalComponent],
      providers: [
        { provide: CmsCacheService, useClass: MockCmsCacheService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fallback principal data', () => {
    expect(component.principal.name).toBe('Mr Joel Mulelu');
  });
});
