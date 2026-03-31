// import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { Component, Inject, PLATFORM_ID } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-about-us',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './about-us.component.html',
//   styleUrl: './about-us.component.scss'
// })
// export class AboutUsComponent {

//   constructor(private fb: FormBuilder) {
//     this.contactForm = this.fb.group({
//       fullName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: [''],
//       program: [''],
//       message: [''],
//     });


//   }
//  milestones = [
//     {
//       label: 'College Founded in',
//       year: '2016',
//       icon: 'star',
//     },
//     {
//       label: '1st College Graduation',
//       year: '2018',
//       superscript: 'ST',
//       icon: 'shield',
//     },
//     {
//       label: 'College Ranking in Kenya',
//       year: '1st',
//       icon: 'layers',
//     },
//     {
//       label: 'Alumni Official Site Launched',
//       year: '2017',
//       icon: 'archive',
//     },
//     {
//       label: 'Scholarship Study Program',
//       year: '2018',
//       icon: 'wifi',
//     },
//   ];


//   dotRows = [6, 22, 38, 54, 70, 86];
//   dotCols = [6, 22, 38, 54, 70, 86, 102, 118];

//   cards = [
//     {
//       title: 'Vision',
//       description: 'To be a dynamic college, committed to scholarship in teaching, research, training and community service.',
//       iconPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.25 9.71 2 12 2c2.291 0 4.545.25 6.75.721v1.515m0 0a7.454 7.454 0 00-.982 3.172M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 01-5.395 5.491m0 0a7.454 7.454 0 01-2.48 5.228" />`
//     },
//     {
//       title: 'Mission',
//       description: 'To provide demand driven curricula and adequate resources with the aim of producing graduates equipped with skills relevant to market needs.',
//       iconPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />`
//     },
//     {
//       title: 'Philosophy',
//       description: 'To Embrace a Green philosophy which fosters the use of innovative technologies in global food security, energy and sustainability, health and universal education.',
//       iconPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />`
//     }
//   ];
//    currentIndex = 2; // start on center card

//   amenities = [
//     {
//       title: 'Lecture Hall',
//       description: 'Lukenya College has spacious lecture halls equipped with modern audio-visual technology for effective learning.',
//       image: 'assets/images/amenities/lecture-hall.jpg',
//     },
//     {
//       title: 'Library',
//       description: 'A well-stocked library with thousands of academic resources to support research and learning.',
//       image: 'assets/images/amenities/library.jpg',
//     },
//     {
//       title: 'Gym',
//       description: 'Lukenya College has a Gym facility that guarantees students wellness and fitness outside the classroom.',
//       image: 'assets/images/amenities/gym.jpg',
//     },
//     {
//       title: 'Football',
//       description: 'Lukenya College has a football field that allows students wellness and fitness outside the classroom.',
//       image: 'assets/images/amenities/football.jpg',
//     },
//     {
//       title: 'Cafeteria',
//       description: 'A modern cafeteria serving nutritious meals to keep students energized throughout the day.',
//       image: 'assets/images/amenities/cafeteria.jpg',
//     },
//   ];

//   private timer: ReturnType<typeof setInterval> | null = null;

//   constructor(@Inject(PLATFORM_ID) private platformId: object) {
//     if (isPlatformBrowser(this.platformId)) {
//       this.timer = setInterval(() => this.next(), 5000);
//     }
//   }

//   ngOnDestroy() {
//     if (this.timer) clearInterval(this.timer);
//   }

//   prev() {
//     this.currentIndex = (this.currentIndex - 1 + this.amenities.length) % this.amenities.length;
//     this.resetTimer();
//   }

//   next() {
//     this.currentIndex = (this.currentIndex + 1) % this.amenities.length;
//     this.resetTimer();
//   }

//   goTo(i: number) {
//     this.currentIndex = i;
//     this.resetTimer();
//   }

//   private resetTimer() {
//     if (!isPlatformBrowser(this.platformId)) return;
//     if (this.timer) clearInterval(this.timer);
//     this.timer = setInterval(() => this.next(), 5000);
//   }

//   // Fan carousel positioning: center card is large & front, sides step back & shrink
//   getCardStyle(i: number): string {
//     const total = this.amenities.length;
//     // offset relative to current: -2, -1, 0, 1, 2
//     let offset = i - this.currentIndex;
//     // wrap around for circular effect
//     if (offset > total / 2) offset -= total;
//     if (offset < -total / 2) offset += total;

//     const abs = Math.abs(offset);

//     // Only show cards within 2 steps
//     if (abs > 2) {
//       return 'display: none;';
//     }

//     const centerX = 50; // % from left of container
//     const cardWidth = abs === 0 ? 300 : abs === 1 ? 220 : 160;
//     const cardHeight = abs === 0 ? 360 : abs === 1 ? 280 : 200;
//     const xShift = offset * 230; // px horizontal shift
//     const zIndex = 10 - abs;
//     const opacity = abs === 2 ? 0.6 : abs === 1 ? 0.85 : 1;
//     const scale = abs === 0 ? 1 : abs === 1 ? 0.88 : 0.72;
//     // rotate side cards slightly inward
//     const rotate = offset * -4;
//     const bottom = abs === 0 ? 0 : abs === 1 ? 20 : 40;

//     return `
//       width: ${cardWidth}px;
//       height: ${cardHeight}px;
//       left: calc(50% + ${xShift}px - ${cardWidth / 2}px);
//       bottom: ${bottom}px;
//       z-index: ${zIndex};
//       opacity: ${opacity};
//       transform: rotate(${rotate}deg) scale(${scale});
//       transform-origin: bottom center;
//     `;
//   }

//   contactForm: FormGroup;
//   isSubmitting = false;
//   submitted = false;

  

//   get f() {
//     return this.contactForm.controls;
//   }

//   onSubmit(): void {
//     if (this.contactForm.invalid) return;

//     this.isSubmitting = true;

//     // Simulate API call
//     setTimeout(() => {
//       this.isSubmitting = false;
//       this.submitted = true;
//       this.contactForm.reset();

//       setTimeout(() => (this.submitted = false), 5000);
//     }, 1500);
//   }
// }



import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnDestroy {

  contactForm: FormGroup;
  isSubmitting = false;
  submitted = false;


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

  // ── Single merged constructor ────────────────────────────────────────────
  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      program: [''],
      message: [''],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.timer = setInterval(() => this.next(), 5000);
    }
  }

  // ── Milestones ───────────────────────────────────────────────────────────
  milestones = [
    { label: 'College Founded in',       year: '2016', icon: 'star'    },
    { label: '1st College Graduation',   year: '2018', superscript: 'ST', icon: 'shield' },
    { label: 'College Ranking in Kenya', year: '1st',  icon: 'layers'  },
    { label: 'Alumni Official Site Launched', year: '2017', icon: 'archive' },
    { label: 'Scholarship Study Program', year: '2018', icon: 'wifi'   },
  ];

  dotRows = [6, 22, 38, 54, 70, 86];
  dotCols = [6, 22, 38, 54, 70, 86, 102, 118];

  // ── Cards ────────────────────────────────────────────────────────────────
  cards = [
    {
      title: 'Vision',
      description: 'To be a dynamic college, committed to scholarship in teaching, research, training and community service.',
      iconPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.25 9.71 2 12 2c2.291 0 4.545.25 6.75.721v1.515m0 0a7.454 7.454 0 00-.982 3.172M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 01-5.395 5.491m0 0a7.454 7.454 0 01-2.48 5.228" />`
    },
    {
      title: 'Mission',
      description: 'To provide demand driven curricula and adequate resources with the aim of producing graduates equipped with skills relevant to market needs.',
      iconPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />`
    },
    {
      title: 'Philosophy',
      description: 'To Embrace a Green philosophy which fosters the use of innovative technologies in global food security, energy and sustainability, health and universal education.',
      iconPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />`
    }
  ];

  currentIndex = 2;

  // ── Amenities carousel ───────────────────────────────────────────────────
  amenities = [
    { title: 'Lecture Hall', description: 'Lukenya College has spacious lecture halls equipped with modern audio-visual technology for effective learning.', image: 'assets/images/amenities/lecture-hall.jpg' },
    { title: 'Library',      description: 'A well-stocked library with thousands of academic resources to support research and learning.',                   image: 'assets/images/amenities/library.jpg'      },
    { title: 'Gym',          description: 'Lukenya College has a Gym facility that guarantees students wellness and fitness outside the classroom.',          image: 'assets/images/amenities/gym.jpg'          },
    { title: 'Football',     description: 'Lukenya College has a football field that allows students wellness and fitness outside the classroom.',            image: 'assets/images/amenities/football.jpg'     },
    { title: 'Cafeteria',    description: 'A modern cafeteria serving nutritious meals to keep students energized throughout the day.',                      image: 'assets/images/amenities/cafeteria.jpg'    },
  ];

  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.amenities.length) % this.amenities.length;
    this.resetTimer();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.amenities.length;
    this.resetTimer();
  }

  goTo(i: number) {
    this.currentIndex = i;
    this.resetTimer();
  }

  private resetTimer() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), 5000);
  }

  getCardStyle(i: number): string {
    const total = this.amenities.length;
    let offset = i - this.currentIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);
    if (abs > 2) return 'display: none;';

    const cardWidth  = abs === 0 ? 300 : abs === 1 ? 220 : 160;
    const cardHeight = abs === 0 ? 360 : abs === 1 ? 280 : 200;
    const xShift  = offset * 230;
    const zIndex  = 10 - abs;
    const opacity = abs === 2 ? 0.6 : abs === 1 ? 0.85 : 1;
    const scale   = abs === 0 ? 1   : abs === 1 ? 0.88 : 0.72;
    const rotate  = offset * -4;
    const bottom  = abs === 0 ? 0   : abs === 1 ? 20   : 40;

    return `
      width: ${cardWidth}px;
      height: ${cardHeight}px;
      left: calc(50% + ${xShift}px - ${cardWidth / 2}px);
      bottom: ${bottom}px;
      z-index: ${zIndex};
      opacity: ${opacity};
      transform: rotate(${rotate}deg) scale(${scale});
      transform-origin: bottom center;
    `;
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitted = true;
      this.contactForm.reset();
      setTimeout(() => (this.submitted = false), 5000);
    }, 1500);
  }
}