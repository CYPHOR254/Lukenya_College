import { of } from 'rxjs';

export class MockCmsCacheService {
  getSiteSettings() { return of(null); }
  getSlides() { return of([]); }
  getValueCards() { return of([]); }
  getMilestones() { return of([]); }
  getAmenities() { return of([]); }
  getAcademicPrograms() { return of([]); }
  getFaqTopics() { return of([]); }
  getStaffMember(_role: string) { return of(null); }
  getSchoolPage(_slug: string) { return of(null); }
  getGalleryImages(_category?: string) { return of([]); }
  getNewsArticles(_limit?: number) { return of([]); }
  getProgramOptions() { return of([]); }
  imageUrl(_source: any) {
    return { width: () => ({ auto: () => ({ url: () => 'mock-image-url' }) }) };
  }
}
