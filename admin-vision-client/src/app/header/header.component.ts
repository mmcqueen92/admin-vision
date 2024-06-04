import { Component } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isFrench: boolean = false;
  showDropdown: boolean = false;
  showNav: boolean = false;

  logout() {
    console.log('Logout!');
  }

  toggleDropdown() {
    console.log('Toggle dropdown');
  }

  toggleLanguage() {
    console.log('Toggle language');
  }
}
