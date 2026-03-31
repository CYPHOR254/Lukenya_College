// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-engineering-remarks',
//   standalone: true,
//   imports: [],
//   templateUrl: './engineering-remarks.component.html',
//   styleUrl: './engineering-remarks.component.scss'
// })
// export class EngineeringRemarksComponent {

// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-engineering-remarks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './engineering-remarks.component.html',
  styleUrl: './engineering-remarks.component.scss'
})
export class EngineeringRemarksComponent {
  hod = {
    name: 'Stephen Mutunga',
    title: 'College School of Engineering',
    collegeHighlight: 'Lukenya',
    imageSrc: 'assets/images/engineering-hod.jpg',
    imageAlt: 'Stephen Mutunga - Lukenya College School of Engineering',
    paragraphs: [
      `The School of Engineering and Technical Studies is committed to developing skilled, innovative,
       and industry-ready professionals equipped to meet the demands of a dynamic global economy.`,
      `Since its establishment in 2014, the department has expanded significantly in program offerings,
       student enrollment, and infrastructure development. Our focus is on competency-based training
       that integrates technical expertise, practical application, entrepreneurship, and industrial exposure.`,
      `As Head of Department, I am dedicated to ensuring high academic standards, strong industry linkages,
       and continuous curriculum improvement to produce graduates who are not only employable but also
       capable of creating opportunities for themselves and others.`,
      `We take pride in shaping professionals who combine technical competence with integrity, creativity,
       and resilience.`,
    ],
  };
}