import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsCacheService } from '../../services/cms-cache.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-hod-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hod-education.component.html',
  styleUrl: './hod-education.component.scss'
})
export class HodEducationComponent implements OnInit {
  hod = {
    name: 'Fredrick M . Nzavi',
    title: 'College School of Education',
    collegeHighlight: 'Lukenya',
    imageSrc: 'assets/images/education-hod.jpg',
    imageAlt: 'Fredrick M. Nzavi - Lukenya College School of Education',
    paragraphs: [
      `The School of Education at Lukenya College is committed to preparing competent, ethical, and innovative educators who are equipped to meet the evolving demands of the education sector.`,
      `Since its establishment in 2014, the department has grown steadily, producing highly skilled teachers who serve in both public and private institutions across the country. Our programmes combine strong pedagogical foundations with practical teaching experience to ensure our graduates are confident, adaptable, and classroom-ready.`,
      `As Head of Department, I am dedicated to maintaining high academic standards, strengthening professional mentorship, and fostering a culture of excellence within teacher training. We strive to nurture educators who not only impart knowledge but also inspire, lead, and positively transform their communities.`,
    ],
  };

  constructor(private cmsCache: CmsCacheService) {}

  ngOnInit(): void {
    this.cmsCache.getStaffMember('education-hod').pipe(
      catchError(() => of(null))
    ).subscribe(staff => {
      if (staff) {
        this.hod = {
          name: staff.name,
          title: staff.title,
          collegeHighlight: staff.collegeHighlight || 'Lukenya',
          imageSrc: staff.image ? this.cmsCache.imageUrl(staff.image).width(400).auto('format').url() : 'assets/images/education-hod.jpg',
          imageAlt: `${staff.name} - Lukenya College ${staff.title}`,
          paragraphs: staff.paragraphs || [],
        };
      }
    });
  }
}
