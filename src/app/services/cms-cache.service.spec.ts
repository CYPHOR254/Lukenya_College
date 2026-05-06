import { TestBed } from '@angular/core/testing';
import { TransferState, makeStateKey } from '@angular/core';
import { of, throwError } from 'rxjs';
import { CmsCacheService } from './cms-cache.service';
import { CmsService } from './cms.service';

describe('CmsCacheService', () => {
  let service: CmsCacheService;
  let cmsServiceSpy: jasmine.SpyObj<CmsService>;
  let transferState: TransferState;

  const mockSlides = [
    { _id: '1', title: 'Slide 1', subtitle: 'Sub 1', image: null as any, alt: 'Alt 1', order: 1, imageUrl: '' }
  ];

  beforeEach(() => {
    cmsServiceSpy = jasmine.createSpyObj('CmsService', [
      'getSlides', 'getSiteSettings', 'getValueCards', 'getMilestones',
      'getAmenities', 'getAcademicPrograms', 'getFaqTopics',
      'getStaffMember', 'getAllStaffMembers', 'getSchoolPage',
      'getGalleryImages', 'getNewsArticles', 'getProgramOptions', 'imageUrl'
    ]);

    cmsServiceSpy.getSlides.and.returnValue(of(mockSlides));
    cmsServiceSpy.getSiteSettings.and.returnValue(of(null as any));
    cmsServiceSpy.getFaqTopics.and.returnValue(of([]));
    cmsServiceSpy.getProgramOptions.and.returnValue(of([]));
    cmsServiceSpy.getNewsArticles.and.returnValue(of([]));
    cmsServiceSpy.getStaffMember.and.returnValue(of(null as any));
    cmsServiceSpy.getGalleryImages.and.returnValue(of([]));
    cmsServiceSpy.imageUrl.and.returnValue({ width: () => ({ auto: () => ({ url: () => 'url' }) }) } as any);

    TestBed.configureTestingModule({
      providers: [
        CmsCacheService,
        { provide: CmsService, useValue: cmsServiceSpy },
      ]
    });

    service = TestBed.inject(CmsCacheService);
    transferState = TestBed.inject(TransferState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call CmsService on cache miss', (done) => {
    service.getSlides().subscribe(result => {
      expect(result).toEqual(mockSlides);
      expect(cmsServiceSpy.getSlides).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should cache results on second call (shareReplay)', (done) => {
    // First call
    service.getSlides().subscribe(() => {
      // Second call should use cache
      service.getSlides().subscribe(result => {
        expect(result).toEqual(mockSlides);
        // CmsService should only have been called once
        expect(cmsServiceSpy.getSlides).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  it('should return data from TransferState if available', (done) => {
    const key = makeStateKey<any[]>('facilitySlides');
    transferState.set(key, mockSlides);

    service.getSlides().subscribe(result => {
      expect(result).toEqual(mockSlides);
      // Should NOT call CmsService since data was in TransferState
      expect(cmsServiceSpy.getSlides).not.toHaveBeenCalled();
      done();
    });
  });

  it('should propagate errors', (done) => {
    cmsServiceSpy.getSlides.and.returnValue(throwError(() => new Error('Network error')));
    // Clear cache to force a fresh fetch
    (service as any).cache.clear();

    service.getSlides().subscribe({
      error: (err) => {
        expect(err.message).toBe('Network error');
        done();
      }
    });
  });

  it('imageUrl should delegate to CmsService', () => {
    const mockSource = { _type: 'image' as const, asset: { _ref: 'ref', _type: 'reference' as const } };
    service.imageUrl(mockSource);
    expect(cmsServiceSpy.imageUrl).toHaveBeenCalledWith(mockSource);
  });
});
