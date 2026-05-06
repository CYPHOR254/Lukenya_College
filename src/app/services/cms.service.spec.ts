import { TestBed } from '@angular/core/testing';
import { CmsService } from './cms.service';

describe('CmsService', () => {
  let service: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSlides() should return an observable', () => {
    const result = service.getSlides();
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });

  it('getFaqTopics() should return an observable', () => {
    const result = service.getFaqTopics();
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });

  it('getStaffMember() should return an observable', () => {
    const result = service.getStaffMember('principal');
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });

  it('getNewsArticles() should return an observable', () => {
    const result = service.getNewsArticles(5);
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });

  it('imageUrl() should return a builder with chaining methods', () => {
    const mockImage = {
      _type: 'image' as const,
      asset: { _ref: 'image-abc123', _type: 'reference' as const }
    };
    const builder = service.imageUrl(mockImage);
    expect(builder).toBeDefined();
    expect(typeof builder.width).toBe('function');
  });

  it('getProgramOptions() should return an observable', () => {
    const result = service.getProgramOptions();
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });
});
