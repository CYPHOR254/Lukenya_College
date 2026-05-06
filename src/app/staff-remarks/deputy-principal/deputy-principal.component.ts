import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsCacheService } from '../../services/cms-cache.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-deputy-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deputy-principal.component.html',
  styleUrls: ['./deputy-principal.component.scss'],
})
export class DeputyPrincipalComponent implements OnInit {
  deputy = {
    name: 'Mr Patrick Mutua',
    title: 'College Deputy Principal',
    collegeHighlight: 'Lukenya',
    imageSrc: 'assets/images/deputy-principal.jpg',
    imageAlt: 'Mr Patrick Mutua - Lukenya College Deputy Principal',
    paragraphs: [
      `It is my pleasure to welcome you to Lukenya College — a dynamic institution committed to excellence in Technical and Vocational Education and Training (TVET) as well as teacher education.`,
      `At Lukenya, our mandate is clear: to equip learners with relevant knowledge, practical skills, and professional competencies that respond directly to industry needs. Over the years, the College has established itself as a centre of excellence, producing highly skilled technicians and competent educators who continue to make meaningful contributions locally and internationally.`,
      `However, education must go beyond certification. The true value of training lies in its ability to translate into meaningful employment and entrepreneurship opportunities. As an institution, we recognize the critical importance of strengthening the link between training and the world of work.`,
      `Our approach is therefore industry-focused, competency-based, and innovation-driven. We emphasize practical exposure, technical mastery, and character formation to ensure that our graduates are not only qualified, but also competitive and adaptable in an evolving global economy.`,
      `At Lukenya College, we do not simply train — we prepare professionals. We are committed to shaping graduates who are solution-oriented, self-reliant, and ready to drive development in their respective fields.`,
      `I invite you to join us as we continue building a future where education and industry walk hand in hand.`,
    ],
  };

  constructor(private cmsCache: CmsCacheService) {}

  ngOnInit(): void {
    this.cmsCache.getStaffMember('deputy-principal').pipe(
      catchError(() => of(null))
    ).subscribe(staff => {
      if (staff) {
        this.deputy = {
          name: staff.name,
          title: staff.title,
          collegeHighlight: staff.collegeHighlight || 'Lukenya',
          imageSrc: staff.image ? this.cmsCache.imageUrl(staff.image).width(400).auto('format').url() : 'assets/images/deputy-principal.jpg',
          imageAlt: `${staff.name} - Lukenya College ${staff.title}`,
          paragraphs: staff.paragraphs || [],
        };
      }
    });
  }
}
