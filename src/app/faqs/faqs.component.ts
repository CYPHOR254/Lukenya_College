import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CmsCacheService } from '../services/cms-cache.service';
import { catchError, of } from 'rxjs';

interface Topic {
  name: string;
  faqs: Faq[];
}

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
export class FaqsComponent implements OnInit {
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
  ];

  selectedTopicIndex = 0;

  get activeFaqs(): Faq[] {
    return this.topics[this.selectedTopicIndex]?.faqs || [];
  }

  selectTopic(index: number) {
    this.selectedTopicIndex = index;
    this.openIndex = null;
  }

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  constructor(private cmsCache: CmsCacheService) {}

  ngOnInit(): void {
    this.cmsCache.getFaqTopics().pipe(
      catchError(() => of(null))
    ).subscribe(cmsTopics => {
      if (cmsTopics && cmsTopics.length > 0) {
        this.topics = cmsTopics.map(t => ({
          name: t.name,
          faqs: (t.faqs || []).map(f => ({
            question: f.question,
            answer: f.answer,
          })),
        }));
        this.selectedTopicIndex = 0;
      }
    });
  }
}
