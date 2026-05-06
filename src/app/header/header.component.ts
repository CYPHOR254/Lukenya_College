
// import { Component, HostListener } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { ModalComponent } from '../modal/modal.component'; // ← add this


// interface NavLink {
//   label: string;
//   path?: string;
//   external?: boolean;  // 👈 add this
//   dropdown?: { label: string; path: string }[];
// }

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule, RouterModule, ModalComponent],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent {
//   isMenuOpen = false;
//   dropdownOpen = false;
//   mobileAcademicsOpen = false;
//   isModalOpen = false; // ← add this
//   activeDropdown: string | null = null;

//   navLinks: NavLink[] = [
//     { label: 'Home', path: '/' },
//     { label: 'About Us', path: '/about' },
//     {
//       label: 'Academics',
//       dropdown: [
//         { label: 'School of Education', path: 'school-of-education' },
//         { label: 'School of Engineering', path: '/school-of-engineering' },
//         { label: 'School of Business', path: '/school-of-business' },
//       ],
//     },
//     {
//       label: 'Portals',
//       dropdown: [
//         { label: 'Student Portal', path: 'https://your-student-portal-url.com', external: true },
//         { label: 'Staff Portal', path: 'https://your-staff-portal-url.com', external: true },
//         { label: 'E-Learning', path: 'https://your-elearning-url.com', external: true },
//       ]
//     }
//   { label: 'Student Portal', path: 'https://lc.mzizi.co.ke/ISIMSLogin.aspx', external: true }, // 👈
//   ];

//   toggleMenu() {
//     this.isMenuOpen = !this.isMenuOpen;
//   }

//   toggleDropdown() {
//     this.dropdownOpen = !this.dropdownOpen;
//   }

//   toggleMobileAcademics() {
//     this.mobileAcademicsOpen = !this.mobileAcademicsOpen;
//   }

//   closeDropdown() {
//     this.dropdownOpen = false;
//   }

//   isDropdownOpen(label: string): boolean {
//   return this.activeDropdown === label;
// }

//   // Close dropdown when clicking outside
//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent) {
//     const target = event.target as HTMLElement;
//     if (!target.closest('.academics-dropdown-wrapper')) {
//       this.dropdownOpen = false;
//     }
//   }
// }




import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

export interface DropdownItem {
  label: string;
  path: string;
  external?: boolean;
}

export interface NavLink {
  label: string;
  path?: string;
  external?: boolean;
  dropdown?: DropdownItem[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isMenuOpen = false;
  isModalOpen = false;
  activeDropdown: string | null = null;
  mobileOpenDropdown: string | null = null;

  navLinks: NavLink[] = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'About',
      path: '/about',
    },
    {
      label: 'Academics',
      dropdown: [
        { label: 'School of Education', path: 'school-of-education' },
        { label: 'School of Engineering', path: '/school-of-engineering' },
        { label: 'School of Business', path: '/school-of-business' },
      ],
    },
    {
      label: 'Portals',
      dropdown: [
        {
          label: 'Student Portal',
          path: 'https://lc.mzizi.co.ke/ISIMSLogin.aspx',
          external: true,
        },
        {
          label: 'Staff Portal',
          path: 'https://staff.lukenyacollege.ac.ke',
          external: true,
        },
        {
          label: 'E-Learning',
          path: 'https://virtual.lukenyauniversity.ac.ke/login/index.php',
          external: true,
        },
      ],
    },
  ];

  /** Toggle desktop dropdown by label */
  toggleDropdown(label: string): void {
    this.activeDropdown = this.activeDropdown === label ? null : label;
  }

  /** Check if a specific desktop dropdown is open */
  isDropdownOpen(label: string): boolean {
    return this.activeDropdown === label;
  }

  /** Close all desktop dropdowns */
  closeDropdown(): void {
    this.activeDropdown = null;
  }

  /** Toggle mobile menu */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.mobileOpenDropdown = null;
    }
  }

  /** Toggle a specific mobile accordion dropdown */
  toggleMobileDropdown(label: string): void {
    this.mobileOpenDropdown = this.mobileOpenDropdown === label ? null : label;
  }

  /** Check if a specific mobile accordion dropdown is open */
  isMobileDropdownOpen(label: string): boolean {
    return this.mobileOpenDropdown === label;
  }

  /** Close everything when clicking outside */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isInsideNav = target.closest('nav') || target.closest('.fixed');
    if (!isInsideNav) {
      this.activeDropdown = null;
    }
  }
}