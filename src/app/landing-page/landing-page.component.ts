import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../services/api.service';
import { CmsCacheService } from '../services/cms-cache.service';
import { FacilitySlide, FaqItem, SiteSettings } from '../models/cms.models';
import { catchError, of } from 'rxjs';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit, OnDestroy {
  isMenuOpen = false;

  // ── Countdown ──────────────────────────────────────────────
  targetDate = new Date('2025-11-28T08:00:00');
  isModalOpen = false;
  days = '00';
  hours = '00';
  minutes = '00';
  seconds = '00';

  eventDateDisplay = 'November 28th, 2025';
  eventDayTime = 'Monday, 08:00 AM - 06:00 PM';

  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  // ── Form ───────────────────────────────────────────────────
  form = {
    fullName: '',
    email: '',
    phone: '',
    program: '',
    mode: '',
    message: '',
  };

  programs: string[] = [
    'Department of Education',
    'Business Department',
    'Technical Department',
    'Diploma in ICT',
    'Certificate in Accounting',
    'Other',
  ];

  submitted = false;
  loading = false;
  errorMessage = '';

  onSubmit() {
    const { fullName, email, phone, program, mode, message } = this.form;
    if (!fullName || !email || !phone || !program || !mode || !message) {
      this.errorMessage = 'Please fill in all fields before submitting.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.api.post('send-application', this.form).subscribe({
      next: () => {
        this.loading = false;
        this.submitted = true;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
        console.error('Submission error:', err);
      }
    });
  }

  // ── Facilities Slideshow ───────────────────────────────────
  currentYear = new Date().getFullYear();

  slides: Slide[] = [
    { image: 'Carpentry_latest.jpg', title: 'Carpentry & Woodwork Lab', subtitle: 'Hands-on training with industrial-grade woodworking equipment', alt: 'Carpentry Workshop' },
    { image: 'library.jpg', title: 'Library & Research Center', subtitle: 'Thousands of resources at your fingertips', alt: 'Library' },
    { image: 'chefs.jpg', title: 'Science Laboratories', subtitle: 'Cutting-edge equipment for hands-on experiments', alt: 'Laboratory' },
    { image: 'sports.png', title: 'Sports & Fitness Complex', subtitle: 'Olympic-standard facilities for training and recreation', alt: 'Sports Complex' },
    { image: 'Plumbing_latest.jpg', title: 'Plumbing & Pipefitting Workshop', subtitle: 'Practical skills in water systems and pipe installation', alt: 'Plumbing Lab' },
    { image: 'automotive_latest.jpg', title: 'Automotive Mechanics Workshop', subtitle: 'Real vehicle diagnostics and repair training', alt: 'Automotive Workshop' },
    { image: 'barbering_latest.jpg', title: 'Barbering & Cosmetology Studio', subtitle: 'Professional grooming skills in a fully equipped salon', alt: 'Barbering Studio' },
    { image: 'beauty.jpg', title: 'Beauty Therapy Lab', subtitle: 'Nail care, skin treatment and beauty therapy practice', alt: 'Beauty Therapy Lab' },
    { image: 'tank.jpg', title: 'Pneumatics & Fluid Power Lab', subtitle: 'Industrial equipment training for engineering students', alt: 'tank Lab' },
  ];

  openIndex: number | null = null;

  faqs = [
    { question: 'Are scholarships available for students?', answer: 'Yes, Lukenya College offers merit-based and need-based scholarships covering up to 100% of tuition. We also have special scholarships for international students, student athletes, and those excelling in arts and sciences. Application deadlines vary by scholarship type.' },
    { question: 'What is the tuition fee structure?', answer: 'Tuition fees vary by program and level of study. Certificate programs start from KES 15,000 per semester, diploma programs from KES 25,000, and degree programs from KES 45,000. Payment plans and HELB loans are available.' },
    { question: 'Is on-campus housing available?', answer: 'Yes, Lukenya College provides affordable on-campus hostel accommodation for both male and female students. Rooms are available on a first-come, first-served basis. All hostels have Wi-Fi, security, and communal dining facilities.' },
    { question: 'How long are the academic programs?', answer: 'Program durations vary: Artisan courses run 6 months, Certificate programs 1 year, Diploma programs 2 years, and Degree programs 3–4 years. Some programs also offer evening and weekend classes for working professionals.' },
  ];

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  currentSlide = 0;
  readonly SLIDE_DURATION = 5000;

  private slideTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private api: ApiService,
    private cmsCache: CmsCacheService,
  ) {}

  // ── Lifecycle ──────────────────────────────────────────────
  ngOnInit(): void {
    // Load CMS content
    this.loadCmsContent();

    if (isPlatformBrowser(this.platformId)) {
      this.updateCountdown();
      this.countdownTimer = setInterval(() => this.updateCountdown(), 1000);
      this.startSlideTimer();
    }
  }

  private loadCmsContent(): void {
    // Load slides from CMS
    this.cmsCache.getSlides().pipe(
      catchError(() => of(null))
    ).subscribe(cmsSlides => {
      if (cmsSlides && cmsSlides.length > 0) {
        this.slides = cmsSlides.map(s => ({
          image: s.image ? this.cmsCache.imageUrl(s.image).width(1200).auto('format').url() : '',
          title: s.title,
          subtitle: s.subtitle,
          alt: s.alt || s.title,
        }));
        if (isPlatformBrowser(this.platformId)) {
          this.resetSlideTimer();
        }
      }
    });

    // Load FAQs from CMS (first topic / general)
    this.cmsCache.getFaqTopics().pipe(
      catchError(() => of(null))
    ).subscribe(topics => {
      if (topics && topics.length > 0) {
        // Get first 4 FAQs from the General topic
        const generalTopic = topics.find(t => t.name === 'General') || topics[0];
        if (generalTopic?.faqs?.length > 0) {
          this.faqs = generalTopic.faqs.slice(0, 4).map(f => ({
            question: f.question,
            answer: f.answer,
          }));
        }
      }
    });

    // Load site settings from CMS
    this.cmsCache.getSiteSettings().pipe(
      catchError(() => of(null))
    ).subscribe(settings => {
      if (settings) {
        if (settings.countdownTarget) {
          this.targetDate = new Date(settings.countdownTarget);
        }
        if (settings.eventDateDisplay) {
          this.eventDateDisplay = settings.eventDateDisplay;
        }
        if (settings.eventDayTime) {
          this.eventDayTime = settings.eventDayTime;
        }
      }
    });

    // Load program options from CMS
    this.cmsCache.getProgramOptions().pipe(
      catchError(() => of(null))
    ).subscribe(options => {
      if (options && options.length > 0) {
        this.programs = options.map(o => o.name);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    if (this.slideTimer) clearInterval(this.slideTimer);
  }

  // ── Countdown helpers ──────────────────────────────────────
  private pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

  private updateCountdown(): void {
    const distance = this.targetDate.getTime() - Date.now();

    if (distance <= 0) {
      this.days = '00'; this.hours = '00';
      this.minutes = '00'; this.seconds = '00';
      if (this.countdownTimer) clearInterval(this.countdownTimer);
      return;
    }

    this.days    = this.pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
    this.hours   = this.pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.minutes = this.pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    this.seconds = this.pad(Math.floor((distance % (1000 * 60)) / 1000));
  }

  // ── Slideshow helpers ──────────────────────────────────────
  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetSlideTimer();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetSlideTimer();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetSlideTimer();
  }

  padSlideIndex(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  private startSlideTimer(): void {
    this.slideTimer = setInterval(() => this.nextSlide(), this.SLIDE_DURATION);
  }

  private resetSlideTimer(): void {
    if (this.slideTimer) clearInterval(this.slideTimer);
    this.startSlideTimer();
  }
}
