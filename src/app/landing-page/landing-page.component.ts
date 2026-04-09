
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component'; // ← add this

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule , ModalComponent],
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

  form = {
    fullName: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  };

  programs = [
    'Department of Education',
    'Business Department',
    'Technical Department',
    'Diploma in ICT',
    'Certificate in Accounting',
    'Other',
  ];

  submitted = false;

  onSubmit() {
    this.submitted = true;
    // TODO: wire to backend / email service
    console.log('Form submitted:', this.form);
  }


  // ── Facilities Slideshow ───────────────────────────────────
  readonly slides: Slide[] = [
    {
      image: '\Facilities Image.jpg',
      title: 'Workshop Area',
      subtitle: 'Modern Workshop Area for all technical students to get practical skills',
      alt: 'Auditorium',
    },
    {
      image: '\library.jpg',
      title: 'Library & Research Center',
      subtitle: 'Thousands of resources at your fingertips',
      alt: 'Library',
    },
    {
      image: '\chefs.jpg',
      title: 'Science Laboratories',
      subtitle: 'Cutting-edge equipment for hands-on experiments',
      alt: 'Laboratory',
    },
    {
      image: '\sports.png',
      title: 'Sports & Fitness Complex',
      subtitle: 'Olympic-standard facilities for training and recreation',
      alt: 'Sports Complex',
    },
  ];

  openIndex: number | null = null; // all closed by default

  faqs = [
    {
      question: 'Are scholarships available for students?',
      answer: 'Yes, Lukenya College offers merit-based and need-based scholarships covering up to 100% of tuition. We also have special scholarships for international students, student athletes, and those excelling in arts and sciences. Application deadlines vary by scholarship type.',
    },
    {
      question: 'What is the tuition fee structure?',
      answer: 'Tuition fees vary by program and level of study. Certificate programs start from KES 15,000 per semester, diploma programs from KES 25,000, and degree programs from KES 45,000. Payment plans and HELB loans are available.',
    },
    {
      question: 'Is on-campus housing available?',
      answer: 'Yes, Lukenya College provides affordable on-campus hostel accommodation for both male and female students. Rooms are available on a first-come, first-served basis. All hostels have Wi-Fi, security, and communal dining facilities.',
    },
    {
      question: 'How long are the academic programs?',
      answer: 'Program durations vary: Artisan courses run 6 months, Certificate programs 1 year, Diploma programs 2 years, and Degree programs 3–4 years. Some programs also offer evening and weekend classes for working professionals.',
    },
  ];

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  currentSlide = 0;
  readonly SLIDE_DURATION = 5000;

  private slideTimer: ReturnType<typeof setInterval> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  // ── Lifecycle ──────────────────────────────────────────────
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Countdown
      this.updateCountdown();
      this.countdownTimer = setInterval(() => this.updateCountdown(), 1000);

      // Slideshow auto-advance
      this.startSlideTimer();
    }
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

    this.days = this.pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
    this.hours = this.pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
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

  /** Returns a zero-padded label, e.g. 1 → "01" */
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