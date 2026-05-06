import { Injectable, Inject, PLATFORM_ID, makeStateKey, TransferState } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap, shareReplay, catchError } from 'rxjs/operators';
import { CmsService } from './cms.service';
import {
  SiteSettings,
  FacilitySlide,
  ValueCard,
  Milestone,
  Amenity,
  ProgramCategory,
  FaqTopic,
  StaffMember,
  SchoolPage,
  GalleryImage,
  NewsArticle,
  ProgramOption,
  SanityImage,
} from '../models/cms.models';
// TransferState keys
const SITE_SETTINGS_KEY = makeStateKey<SiteSettings>('siteSettings');
const SLIDES_KEY = makeStateKey<FacilitySlide[]>('facilitySlides');
const VALUE_CARDS_KEY = makeStateKey<ValueCard[]>('valueCards');
const MILESTONES_KEY = makeStateKey<Milestone[]>('milestones');
const AMENITIES_KEY = makeStateKey<Amenity[]>('amenities');
const ACADEMIC_PROGRAMS_KEY = makeStateKey<ProgramCategory[]>('academicPrograms');
const FAQ_TOPICS_KEY = makeStateKey<FaqTopic[]>('faqTopics');
const GALLERY_IMAGES_KEY = makeStateKey<GalleryImage[]>('galleryImages');
const NEWS_ARTICLES_KEY = makeStateKey<NewsArticle[]>('newsArticles');
const PROGRAM_OPTIONS_KEY = makeStateKey<ProgramOption[]>('programOptions');

@Injectable({
  providedIn: 'root',
})
export class CmsCacheService {
  private cache = new Map<string, Observable<any>>();

  constructor(
    private cms: CmsService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  imageUrl(source: SanityImage): any {
    return this.cms.imageUrl(source);
  }

  getSiteSettings(): Observable<SiteSettings> {
    return this.withTransferState(
      'siteSettings',
      SITE_SETTINGS_KEY,
      () => this.cms.getSiteSettings()
    );
  }

  getSlides(): Observable<FacilitySlide[]> {
    return this.withTransferState(
      'slides',
      SLIDES_KEY,
      () => this.cms.getSlides()
    );
  }

  getValueCards(): Observable<ValueCard[]> {
    return this.withTransferState(
      'valueCards',
      VALUE_CARDS_KEY,
      () => this.cms.getValueCards()
    );
  }

  getMilestones(): Observable<Milestone[]> {
    return this.withTransferState(
      'milestones',
      MILESTONES_KEY,
      () => this.cms.getMilestones()
    );
  }

  getAmenities(): Observable<Amenity[]> {
    return this.withTransferState(
      'amenities',
      AMENITIES_KEY,
      () => this.cms.getAmenities()
    );
  }

  getAcademicPrograms(): Observable<ProgramCategory[]> {
    return this.withTransferState(
      'academicPrograms',
      ACADEMIC_PROGRAMS_KEY,
      () => this.cms.getAcademicPrograms()
    );
  }

  getFaqTopics(): Observable<FaqTopic[]> {
    return this.withTransferState(
      'faqTopics',
      FAQ_TOPICS_KEY,
      () => this.cms.getFaqTopics()
    );
  }

  getStaffMember(role: string): Observable<StaffMember> {
    const key = makeStateKey<StaffMember>(`staff-${role}`);
    return this.withTransferState(
      `staff-${role}`,
      key,
      () => this.cms.getStaffMember(role)
    );
  }

  getSchoolPage(slug: string): Observable<SchoolPage> {
    const key = makeStateKey<SchoolPage>(`school-${slug}`);
    return this.withTransferState(
      `school-${slug}`,
      key,
      () => this.cms.getSchoolPage(slug)
    );
  }

  getGalleryImages(category?: string): Observable<GalleryImage[]> {
    const cacheKey = category ? `gallery-${category}` : 'gallery-all';
    return this.withTransferState(
      cacheKey,
      GALLERY_IMAGES_KEY,
      () => this.cms.getGalleryImages(category)
    );
  }

  getNewsArticles(limit = 10): Observable<NewsArticle[]> {
    return this.withTransferState(
      'newsArticles',
      NEWS_ARTICLES_KEY,
      () => this.cms.getNewsArticles(limit)
    );
  }

  getProgramOptions(): Observable<ProgramOption[]> {
    return this.withTransferState(
      'programOptions',
      PROGRAM_OPTIONS_KEY,
      () => this.cms.getProgramOptions()
    );
  }

  private withTransferState<T>(
    cacheKey: string,
    stateKey: ReturnType<typeof makeStateKey<T>>,
    fetchFn: () => Observable<T>
  ): Observable<T> {
    // Check TransferState first (browser hydration)
    const stateValue = this.transferState.get(stateKey, null as any);
    if (stateValue) {
      this.transferState.remove(stateKey);
      return of(stateValue);
    }

    // Check in-memory cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Fetch and cache
    const obs$ = fetchFn().pipe(
      tap((data) => {
        // On server, store in TransferState for hydration
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(stateKey, data);
        }
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
      catchError((error) => {
        console.error(`CMS fetch error for ${cacheKey}:`, error);
        this.cache.delete(cacheKey);
        throw error;
      })
    );

    this.cache.set(cacheKey, obs$);
    return obs$;
  }
}
