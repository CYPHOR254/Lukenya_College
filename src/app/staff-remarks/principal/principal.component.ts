import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsCacheService } from '../../services/cms-cache.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-principal-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  principal = {
    name: 'Mr Joel Mulelu',
    title: 'College Principal',
    collegeHighlight: 'Lukenya',
    imageSrc: 'assets/images/principal.jpg',
    imageAlt: 'Mr Joel Mulelu - Lukenya College Principal',
    paragraphs: [
      `Welcome to Lukenya College — a duly accredited tertiary institution registered by the Ministry of Education and regulated by the Technical and Vocational Education and Training Authority (TVETA) and NITA.`,
      `Strategically located in Emali Town, approximately 125 kilometers from Nairobi and 500 meters off Mombasa Road, the College provides a conducive learning environment designed to nurture skill development, innovation, and professional growth.`,
      `Since its inception, Lukenya College has experienced remarkable growth in student enrollment, academic programmes, staff development, and infrastructure expansion. This growth reflects our commitment to delivering quality technical and professional training that meets national and global standards.`,
      `Our programmes are designed to equip learners with practical competencies, entrepreneurial skills, and industry-relevant knowledge that enhance employability and promote economic empowerment. We believe education should not only transform individuals, but also create sustainable impact within communities.`,
      `At Lukenya College, we cultivate a culture of discipline, hard work, integrity, and excellence. We encourage our students to take full advantage of the opportunities available, develop their talents, and confidently step into a world of limitless possibilities.`,
      `I warmly invite you to join our vibrant academic community and become part of an institution dedicated to shaping skilled professionals and responsible leaders for tomorrow.`,
    ],
  };

  constructor(private cmsCache: CmsCacheService) {}

  ngOnInit(): void {
    this.cmsCache.getStaffMember('principal').pipe(
      catchError(() => of(null))
    ).subscribe(staff => {
      if (staff) {
        this.principal = {
          name: staff.name,
          title: staff.title,
          collegeHighlight: staff.collegeHighlight || 'Lukenya',
          imageSrc: staff.image ? this.cmsCache.imageUrl(staff.image).width(400).auto('format').url() : 'assets/images/principal.jpg',
          imageAlt: `${staff.name} - Lukenya College ${staff.title}`,
          paragraphs: staff.paragraphs || [],
        };
      }
    });
  }
}
