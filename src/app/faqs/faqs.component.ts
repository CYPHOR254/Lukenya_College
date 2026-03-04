import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Topic {
  name: string;
  faqs: Faq[];
}

// ← ADD THIS
interface Faq {
  question: string;
  answer: string;
}
@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent {
  searchQuery = '';

  onSearch() {
    console.log('Searching:', this.searchQuery);
  }
  openIndex: number | null = 0;

  topics: Topic[] = [
    {
      name: 'General',
      faqs: [
        { question: 'Are scholarships available for students?', answer: 'Yes, Lukenya College offers merit-based and need-based scholarships covering up to 100% of tuition. We also have special scholarships for international students, student athletes, and those excelling in arts and sciences. Application deadlines vary by scholarship type.' },
        { question: 'What is the tuition fee structure?', answer: 'Tuition fees vary by program. Certificate programs start from KES 15,000 per semester, diploma from KES 25,000, and degree programs from KES 45,000. HELB loans and payment plans are available.' },
        { question: 'Is on-campus housing available?', answer: 'Yes, Lukenya College provides affordable hostel accommodation for both male and female students on a first-come, first-served basis. All hostels have Wi-Fi, security, and communal dining.' },
        { question: 'How long are the academic programs?', answer: 'Artisan courses run 6 months, Certificate programs 1 year, Diploma programs 2 years, and Degree programs 3–4 years. Evening and weekend classes are available for working professionals.' },
      ],
    },
    {
      name: 'Scholarships',
      faqs: [
        { question: 'Who qualifies for a scholarship?', answer: 'Scholarships are available for students with outstanding academic performance, financial need, sports excellence, or those from disadvantaged backgrounds.' },
        { question: 'How do I apply for a scholarship?', answer: 'Submit a scholarship application form along with your academic transcripts, a recommendation letter, and a personal statement to the admissions office.' },
        { question: 'When is the scholarship application deadline?', answer: 'Deadlines vary by scholarship type. Check the college website or contact the admissions office for the current academic year deadlines.' },
        { question: 'Can international students apply for scholarships?', answer: 'Yes, Lukenya College has special scholarships specifically set aside for international students. Contact the admissions team for eligibility criteria.' },
      ],
    },
    {
      name: 'Fee Structure',
      faqs: [
        { question: 'What are the tuition fees for diploma programs?', answer: 'Diploma program fees start from KES 25,000 per semester. Fees may vary depending on the specific program.' },
        { question: 'Are there payment plans available?', answer: 'Yes, students can pay fees in installments. The college offers flexible payment plans to ease the financial burden on students and their families.' },
        { question: 'Does the college accept HELB loans?', answer: 'Yes, Lukenya College is a HELB-registered institution. Students can apply for HELB loans to cover tuition and other educational expenses.' },
        { question: 'Are there any hidden fees?', answer: 'No hidden fees. All fees including registration, examination, and activity fees are disclosed upfront during admission.' },
      ],
    },
    {
      name: 'Life at Lukenya College',
      faqs: [
        { question: 'What clubs and activities are available?', answer: 'The college has a wide range of student clubs including drama, debate, sports teams, science clubs, and community service groups.' },
        { question: 'Is there a student cafeteria?', answer: 'Yes, the college has a modern cafeteria serving nutritious and affordable meals throughout the day.' },
        { question: 'What sports facilities are available?', answer: 'Students have access to football fields, basketball courts, volleyball courts, and a gym facility on campus.' },
        { question: 'Is the campus safe?', answer: 'Yes, the campus is secured 24/7 with trained security personnel and CCTV coverage throughout the campus grounds.' },
      ],
    },
    {
      name: 'Hostel availability',
      faqs: [
        { question: 'Is hostel accommodation mandatory?', answer: 'No, hostel accommodation is optional. Students can choose to live on campus or find private accommodation nearby.' },
        { question: 'What is included in hostel fees?', answer: 'Hostel fees cover the room, Wi-Fi access, security, and access to communal kitchen and dining facilities.' },
        { question: 'Are hostels available for both male and female students?', answer: 'Yes, separate, secure hostel blocks are available for both male and female students.' },
        { question: 'How do I secure a hostel room?', answer: 'Hostel rooms are allocated on a first-come, first-served basis. Apply early through the student services office upon admission.' },
      ],
    },
    {
      name: 'Academic programs',
      faqs: [
        { question: 'What programs does Lukenya College offer?', answer: 'Lukenya College offers programs in Education, Business, ICT, Technical, and Short Courses under KNEC, TVET, KASNEB, and other awarding bodies.' },
        { question: 'Can I transfer credits from another institution?', answer: 'Credit transfers are evaluated on a case-by-case basis. Contact the registrar\'s office with your academic transcripts for assessment.' },
        { question: 'Are there evening and weekend classes?', answer: 'Yes, the college offers evening and weekend classes to accommodate working professionals and part-time students.' },
        { question: 'How do I apply for admission?', answer: 'Visit the college admissions office or apply online through the college website. Required documents include KCSE certificate, national ID, and passport photos.' },
      ],
    },
  ];

  selectedTopicIndex = 0;

  get activeFaqs(): Faq[] {
    return this.topics[this.selectedTopicIndex].faqs;
  }

  selectTopic(index: number) {
    this.selectedTopicIndex = index;
    this.openIndex = null;
  }

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}




















