import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>(); // ← add this

  
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
  close() { this.closeModal.emit(); } // ← add this


    onSubmit() {
    this.submitted = true;
    // TODO: wire to backend / email service
    console.log('Form submitted:', this.form);
  }

}
