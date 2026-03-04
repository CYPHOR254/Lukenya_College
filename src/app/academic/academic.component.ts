import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-academic',
  standalone: true,
  imports: [CommonModule ,FormsModule ],
  templateUrl: './academic.component.html',
  styleUrl: './academic.component.scss'
})
export class AcademicComponent {
  
  // ── Contact form ──────────────────────────
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
    console.log('Form submitted:', this.form);
  }

  categories = [
    {
      name: 'KNEC Courses',
      description: 'Kenya National Examinations Council (KNEC) is the national body responsible for overseeing national examinations in the country. It was established to conduct school, post school and other examinations and has the role of ensuring validity and reliability of examinations; ensuring conformity to Kenya\'s goals and changes in government policies relating to the curriculum and examinations. The tertiary exams by KNEC are conducted in the months of March, July and November every year.',
      courses: [
        { title: 'Diploma in Human Resource Management', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './cheerful-woman.jpg' },
        { title: 'Diploma in Business Management', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './bussiness-man.jpg' },
        { title: 'Diploma in Information Communication Technology', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './similing-technician.jpg' },
        { title: 'Diploma in Human Resource Management', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './cheerful-woman.jpg' },
        { title: 'Diploma in Business Management', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './bussiness-man.jpg' },
        { title: 'Diploma in Information Communication Technology', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './similing-technician.jpg' },
        { title: 'Diploma in Social Work & Communication Development', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './cheerful-woman.jpg' },
        { title: 'Diploma in Business Management', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './bussiness-man.jpg' },
        { title: 'Diploma in Information Communication Technology', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './similing-technician.jpg' },
        { title: 'Diploma in Human Resource Management', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './cheerful-woman.jpg' },
        { title: 'Diploma in Business Management', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './bussiness-man.jpg' },
        { title: 'Diploma in Information Communication Technology', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './similing-technician.jpg' },
      ],

      },
    {
      name: 'Short Courses',
      intro: 'Kenya Accountants and Secretaries National Examinations Board (KASNEB) is the body responsible for preparing and administering exams for diploma and professional certificate courses. In addition to these roles, it is the professional body mandated to create the syllabus and offer certifications to students pursuing various courses. The main categories of courses KASNEB is mandated with include Management, Finance, Secretarial Studies, Information Technology, Credit, Governance, Accountancy and other related disciplines. KASNEB exams are normally conducted in the months of May and November every year.',
      courses: [
        { title: 'Hair and beauty therapy', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './beauty.jpg' },
        { title: 'Electrical Installation', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './cable_man.jpg' },
        { title: 'Plumbing', description: 'A groundbreaking facility dedicated to advancing artificial intelligence research and innovation.', image: './plumber.jpg' },
      ],
    },
  ];
}