import { of } from 'rxjs';

export class MockCmsCacheService {
  getSiteSettings() { return of(null); }
  getSlides() { return of([]); }
  getValueCards() { return of([]); }
  getMilestones() { return of([]); }
  getAmenities() { return of([]); }
  getAcademicPrograms() { return of([]); }
  getFaqTopics() { return of([]); }
  getStaffMember() { return of(null); }
  getSchoolPage() { return of(null); }
  getGalleryImages() { return of([]); }
  getNewsArticles() { return of([]); }
  getProgramOptions() { return of([]); }
  imageUrl() {
    return { width: () => ({ auto: () => ({ url: () => 'mock-image-url' }) }) };
  }
}
