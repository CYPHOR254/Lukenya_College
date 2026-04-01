// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent {
//   isMenuOpen = false;

//   navLinks = [
//     { label: 'Home', path: '/', active: true },
//     { label: 'About Us', path: '/about', active: false },
//     { label: 'Academics', path: '/academics', active: false },
//     { label: 'Student Portal', path: '/student-portal', active: false },
//   ];

//   toggleMenu() {
//     this.isMenuOpen = !this.isMenuOpen;
//   }
// }




import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavLink {
  label: string;
  path?: string;
  dropdown?: { label: string; path: string }[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  dropdownOpen = false;
  mobileAcademicsOpen = false;

  navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    {
      label: 'Academics',
      dropdown: [
        { label: 'School of Education', path: 'school-of-education' },
        { label: 'School of Engineering', path: '/school-of-engineering' },
        { label: 'School of Business', path: '/school-of-business' },
      ],
    },
    { label: 'Student Portal', path: '/student-portal' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleMobileAcademics() {
    this.mobileAcademicsOpen = !this.mobileAcademicsOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.academics-dropdown-wrapper')) {
      this.dropdownOpen = false;
    }
  }
}