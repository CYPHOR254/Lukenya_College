import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../services/api.service';
import { CmsCacheService } from '../services/cms-cache.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-school-of-engineering',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './school-of-engineering.component.html',
  styleUrl: './school-of-engineering.component.scss'
})
export class SchoolOfEngineeringComponent implements OnInit {
  isModalOpen = false;

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
  ) {}

  ngOnInit(): void {
    // Load school page content from CMS
    this.cmsCache.getSchoolPage('school-of-engineering').pipe(
      catchError(() => of(null))
    ).subscribe(page => {
      if (page) {
        if (page.programmes?.length) this.programmes = page.programmes;
        if (page.assessmentItems?.length) this.assessmentItems = page.assessmentItems;
        if (page.trainingApproach?.length) this.trainingApproach = page.trainingApproach;
        if (page.attachmentTags?.length) this.attachmentTags = page.attachmentTags;
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
        this.submitted = true;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }

  programmes: string[] = [
    'Diploma in Building Technology',
    'Diploma in Civil Engineering',
    'Diploma in Electrical and Electronics Engineering (Power Option)',
    'Diploma in Food and Beverage Production, Sales & Service',
    'Diploma in Social Work and Community Development',
    'Diploma in General Agriculture',
  ];

  assessmentItems: string[] = [
    'Continuous Assessment Tests (CATs)',
    'End-of-term examinations',
    'Trade projects',
    'National examinations',
  ];

  trainingApproach: string[] = [
    'Practical skills development',
    'Technical drawing and design',
    'Entrepreneurship and business planning',
    'Project-based learning',
    'Industrial exposure',
  ];

  attachmentTags: string[] = [
    'Real-world exposure',
    'Professional experience',
    'Hands-on learning',
  ];
}
