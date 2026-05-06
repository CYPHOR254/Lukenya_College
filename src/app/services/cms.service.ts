import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { environment } from '../../environment.ts/environment';
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

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  private client: SanityClient;
  private imageBuilder: ReturnType<typeof imageUrlBuilder>;

  constructor() {
    this.client = createClient({
      projectId: environment.sanity.projectId,
      dataset: environment.sanity.dataset,
      apiVersion: environment.sanity.apiVersion,
      useCdn: environment.production, // false in dev for instant updates, true in prod for CDN speed
    });
    this.imageBuilder = imageUrlBuilder(this.client);
  }

  imageUrl(source: SanityImage): any {
    return this.imageBuilder.image(source);
  }

  getSiteSettings(): Observable<SiteSettings> {
    return from(
      this.client.fetch(`*[_type == "siteSettings"][0]`)
    );
  }

  getSlides(): Observable<FacilitySlide[]> {
    return from(
      this.client.fetch(
        `*[_type == "facilitySlide"] | order(order asc) {
          _id, title, subtitle, image, alt, order
        }`
      )
    );
  }

  getValueCards(): Observable<ValueCard[]> {
    return from(
      this.client.fetch(
        `*[_type == "valueCard"] | order(order asc) {
          _id, title, description, iconSvgPath, order
        }`
      )
    );
  }

  getMilestones(): Observable<Milestone[]> {
    return from(
      this.client.fetch(
        `*[_type == "milestone"] | order(order asc) {
          _id, label, year, superscript, icon, order
        }`
      )
    );
  }

  getAmenities(): Observable<Amenity[]> {
    return from(
      this.client.fetch(
        `*[_type == "amenity"] | order(order asc) {
          _id, title, description, image, order
        }`
      )
    );
  }

  getAcademicPrograms(): Observable<ProgramCategory[]> {
    return from(
      this.client.fetch(
        `*[_type == "programCategory"] | order(order asc) {
          _id, name, "slug": slug.current, description, order,
          "courses": *[_type == "academicProgram" && references(^._id)] | order(order asc) {
            _id, title, description, image, order
          }
        }`
      )
    );
  }

  getFaqTopics(): Observable<FaqTopic[]> {
    return from(
      this.client.fetch(
        `*[_type == "faqTopic"] | order(order asc) {
          _id, name, order, faqs
        }`
      )
    );
  }

  getStaffMember(role: string): Observable<StaffMember> {
    return from(
      this.client.fetch(
        `*[_type == "staffMember" && role == $role][0] {
          _id, name, title, role, image, collegeHighlight, paragraphs,
          responsibilities, closingParagraphs, order
        }`,
        { role }
      )
    );
  }

  getAllStaffMembers(): Observable<StaffMember[]> {
    return from(
      this.client.fetch(
        `*[_type == "staffMember"] | order(order asc) {
          _id, name, title, role, image, collegeHighlight, paragraphs,
          responsibilities, closingParagraphs, order
        }`
      )
    );
  }

  getSchoolPage(slug: string): Observable<SchoolPage> {
    return from(
      this.client.fetch(
        `*[_type == "schoolPage" && slug.current == $slug][0] {
          _id, name, slug, heroImage, introText, programmes,
          assessmentItems, trainingApproach, attachmentTags
        }`,
        { slug }
      )
    );
  }

  getGalleryImages(category?: string): Observable<GalleryImage[]> {
    const filter = category
      ? `*[_type == "galleryImage" && category == $category]`
      : `*[_type == "galleryImage"]`;
    return from(
      this.client.fetch(
        `${filter} | order(order asc) {
          _id, image, alt, category, order
        }`,
        category ? { category } : {}
      )
    );
  }

  getNewsArticles(limit = 10): Observable<NewsArticle[]> {
    return from(
      this.client.fetch(
        `*[_type == "newsArticle"] | order(publishedAt desc)[0...${limit}] {
          _id, title, slug, excerpt, image, category, author, publishedAt, url
        }`
      )
    );
  }

  getProgramOptions(): Observable<ProgramOption[]> {
    return from(
      this.client.fetch(
        `*[_type == "programOption"] | order(order asc) {
          _id, name, order
        }`
      )
    );
  }
}
