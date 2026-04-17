import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import {  HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  form = {
    fullName: '',
    email: '',
    phone: '',
    program: '',
    mode: '',       // ← added to match backend expectation
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

  constructor(private api: ApiService) {}

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    // Basic client-side validation
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
        this.errorMessage =
          err.error?.message || 'Something went wrong. Please try again.';
        console.error('Submission error:', err);
      }
    });
  }
}