
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../services/api.service'; // adjust path

@Component({
  selector: 'app-school-of-education',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './school-of-education.component.html',
  styleUrl: './school-of-education.component.scss'
})
export class SchoolOfEducationComponent implements OnDestroy {

  // ── Modal & Slideshow ─────────────────────────────────────────────────────
  isModalOpen = false;
  currentIndex = 2;
  amenities: any[] = [];

  private timer: ReturnType<typeof setInterval> | null = null;

  // ── Application Form ──────────────────────────────────────────────────────
  form = {
    fullName: '',
    email: '',
    phone: '',
    program: '',
    mode: '',
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
  loading = false;
  errorMessage = '';

  private apiUrl = 'http://localhost:5000/send-application';

  // ── Constructor ───────────────────────────────────────────────────────────
  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.timer = setInterval(() => this.next(), 5000);
    }
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  // ── Slideshow helpers ─────────────────────────────────────────────────────
  next() {
    if (!this.amenities.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.amenities.length;
    this.resetTimer();
  }

  goTo(i: number) {
    this.currentIndex = i;
    this.resetTimer();
  }

  private resetTimer() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), 5000);
  }

  // ── Form submission ───────────────────────────────────────────────────────
  onSubmit(): void {
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
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
        console.error('Submission error:', err);
      }
    });
  }
}