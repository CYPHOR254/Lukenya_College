import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;

  navLinks = [
    { label: 'Home', path: '/', active: true },
    { label: 'About Us', path: '/about', active: false },
    { label: 'Academics', path: '/academics', active: false },
    { label: 'Student Portal', path: '/student-portal', active: false },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}