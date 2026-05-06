// Sanity image reference type
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SiteSettings {
  heroHeadline: string;
  heroSubtext: string;
  heroImage?: SanityImage;
  countdownTarget: string;
  eventDateDisplay: string;
  eventDayTime: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
}

export interface FacilitySlide {
  _id: string;
  title: string;
  subtitle: string;
  image: SanityImage;
  imageUrl?: string;
  alt: string;
  order: number;
}

export interface ValueCard {
  _id: string;
  title: string;
  description: string;
  iconSvgPath: string;
  order: number;
}

export interface Milestone {
  _id: string;
  label: string;
  year: string;
  superscript?: string;
  icon: string;
  order: number;
}

export interface Amenity {
  _id: string;
  title: string;
  description: string;
  image: SanityImage;
  imageUrl?: string;
  order: number;
}

export interface ProgramCategory {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  order: number;
  courses: AcademicProgram[];
}

export interface AcademicProgram {
  _id: string;
  title: string;
  description: string;
  image: SanityImage;
  imageUrl?: string;
  order: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  _key?: string;
}

export interface FaqTopic {
  _id: string;
  name: string;
  order: number;
  faqs: FaqItem[];
}

export interface StaffMember {
  _id: string;
  name: string;
  title: string;
  role: string;
  image: SanityImage;
  imageUrl?: string;
  collegeHighlight: string;
  paragraphs: string[];
  responsibilities?: string[];
  closingParagraphs?: string[];
  order: number;
}

export interface SchoolPage {
  _id: string;
  name: string;
  slug: { current: string };
  heroImage: SanityImage;
  heroImageUrl?: string;
  introText: string;
  programmes: string[];
  assessmentItems: string[];
  trainingApproach: string[];
  attachmentTags: string[];
}

export interface GalleryImage {
  _id: string;
  image: SanityImage;
  imageUrl?: string;
  alt: string;
  category: string;
  order: number;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  image: SanityImage;
  imageUrl?: string;
  category: string;
  author: string;
  publishedAt: string;
  body?: any[];
  url?: string;
}

export interface ProgramOption {
  _id: string;
  name: string;
  order: number;
}
