import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../services/api.service';
import { CmsCacheService } from '../services/cms-cache.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-school-of-business',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './school-of-business.component.html',
  styleUrl: './school-of-business.component.scss'
})
export class SchoolOfBusinessComponent implements OnInit, OnDestroy {

  isModalOpen = false;
  currentIndex = 2;
  amenities: any[] = [];

  private timer: ReturnType<typeof setInterval> | null = null;

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

  constructor(
    private api: ApiService,
    private cmsCache: CmsCacheService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.timer = setInterval(() => this.next(), 5000);
    }
  }

  ngOnInit(): void {
    // Load program options from CMS
    this.cmsCache.getProgramOptions().pipe(
      catchError(() => of(null))
    ).subscribe(options => {
      if (options && options.length > 0) {
        this.programs = options.map(o => o.name);
      }
    });
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

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
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
        console.error('Submission error:', err);
      }
    });
  }
}
