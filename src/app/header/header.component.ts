
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../modal/modal.component'; // ← add this


interface NavLink {
  label: string;
  path?: string;
  external?: boolean;  // 👈 add this
  dropdown?: { label: string; path: string }[];
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
  dropdownOpen = false;
  mobileAcademicsOpen = false;
  isModalOpen = false; // ← add this

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
  { label: 'Student Portal', path: 'https://lc.mzizi.co.ke/ISIMSLogin.aspx', external: true }, // 👈
];

  // navLinks: NavLink[] = [
  //   { label: 'Home', path: '/' },
  //   { label: 'About Us', path: '/about' },
  //   {
  //     label: 'Academics',
  //     dropdown: [
  //       { label: 'School of Education', path: '/school-of-education' },
  //       { label: 'School of Engineering', path: '/school-of-engineering' },
  //       { label: 'School of Business', path: '/school-of-business' },
  //     ],
  //   },
  //   { label: 'Student Portal', path: 'https://lc.mzizi.co.ke/ISIMSLogin.aspx' },
  // ];

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