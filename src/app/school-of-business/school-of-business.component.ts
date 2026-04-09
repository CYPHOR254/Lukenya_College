import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component'; // ← add this

@Component({
  selector: 'app-school-of-business',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './school-of-business.component.html',
  styleUrl: './school-of-business.component.scss'
})
export class SchoolOfBusinessComponent {

  contactForm: FormGroup;
  isSubmitting = false;
  submitted = false;
  currentIndex = 2;
  isModalOpen = false;

  private timer: ReturnType<typeof setInterval> | null = null;
  amenities: any;

  programs = [
    'Department of Education',
    'Business Department',
    'Technical Department',
    'Diploma in ICT',
    'Certificate in Accounting',
    'Other',
  ];
  form = {
    fullName: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  };

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }


  // ── Single merged constructor ────────────────────────────────────────────
  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      program: [''],
      message: [''],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.timer = setInterval(() => this.next(), 5000);
    }
  }

  next() {
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



  // ── Form ─────────────────────────────────────────────────────────────────
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitted = true;
      this.contactForm.reset();
      setTimeout(() => (this.submitted = false), 5000);
    }, 1500);
  }
}

