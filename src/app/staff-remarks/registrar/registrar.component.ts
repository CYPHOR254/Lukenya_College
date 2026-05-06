import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsCacheService } from '../../services/cms-cache.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  registrar = {
    name: 'Dorcas M Muambi',
    title: 'College Registrar',
    collegeHighlight: 'Lukenya',
    imageSrc: 'assets/images/registrar.jpg',
    imageAlt: 'Dorcas M Muambi - Lukenya College Registrar',
    introParagraphs: [
      `It is my pleasure to welcome you to Lukenya College and reaffirm our commitment to providing quality education and professional training to all qualified students.`,
      `Lukenya College has engaged highly competent teaching and non-teaching staff to ensure that both the academic and welfare needs of our students are effectively met. Having evolved from a technical training institute, we continue to uphold our core value of hands-on knowledge, ensuring that practical skills remain central to our training philosophy.`,
      `The Office of the Registrar plays a vital role in supporting the academic journey of our students. Our responsibilities include:`,
    ],
    responsibilities: [
      'Student admissions',
      'Orientation of new students',
      'Management of academic records',
      'Coordination of examinations and processing of results',
      'Preparation of academic transcripts and certificates',
      'Graduation planning and certification',
    ],
    closingParagraphs: [
      `We provide comprehensive information and support services both online and through our administrative offices. Prospective and continuing students are encouraged to reach out through our official communication channels, including our website and social media platforms.`,
      `I invite all qualified individuals to explore the wide range of programmes offered at Lukenya College — from Trade Tests to Diploma courses across various disciplines.`,
      `Join us as we work together toward building your dream career.`,
    ],
  };

  constructor(private cmsCache: CmsCacheService) {}

  ngOnInit(): void {
    this.cmsCache.getStaffMember('registrar').pipe(
      catchError(() => of(null))
    ).subscribe(staff => {
      if (staff) {
        this.registrar = {
          name: staff.name,
          title: staff.title,
          collegeHighlight: staff.collegeHighlight || 'Lukenya',
          imageSrc: staff.image ? this.cmsCache.imageUrl(staff.image).width(400).auto('format').url() : 'assets/images/registrar.jpg',
          imageAlt: `${staff.name} - Lukenya College ${staff.title}`,
          introParagraphs: staff.paragraphs || [],
          responsibilities: staff.responsibilities || [],
          closingParagraphs: staff.closingParagraphs || [],
        };
      }
    });
  }
}
