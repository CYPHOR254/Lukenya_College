import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsCacheService } from '../services/cms-cache.service';
import { GalleryImage } from '../models/cms.models';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  images: { url: string; alt: string; category: string }[] = [];
  categories: string[] = [];
  selectedCategory = '';
  lightboxImage: string | null = null;

  constructor(private cmsCache: CmsCacheService) {}

  ngOnInit(): void {
    this.cmsCache.getGalleryImages().pipe(
      catchError(() => of(null))
    ).subscribe(cmsImages => {
      if (cmsImages && cmsImages.length > 0) {
        this.images = cmsImages.map(img => ({
          url: img.image ? this.cmsCache.imageUrl(img.image).width(600).auto('format').url() : '',
          alt: img.alt || 'Gallery image',
          category: img.category || 'campus',
        }));
        // Extract unique categories
        this.categories = [...new Set(this.images.map(i => i.category))];
      }
    });
  }

  get filteredImages() {
    if (!this.selectedCategory) return this.images;
    return this.images.filter(i => i.category === this.selectedCategory);
  }

  filterByCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
  }

  openLightbox(imageUrl: string) {
    this.lightboxImage = imageUrl;
  }

  closeLightbox() {
    this.lightboxImage = null;
  }
}
