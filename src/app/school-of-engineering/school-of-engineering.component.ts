import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component'; // ← add this

@Component({
  selector: 'app-school-of-engineering',
  standalone: true,
  imports: [CommonModule , FormsModule, ModalComponent],
  templateUrl: './school-of-engineering.component.html',
  styleUrl: './school-of-engineering.component.scss'
})
export class SchoolOfEngineeringComponent {
  isModalOpen = false;

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
