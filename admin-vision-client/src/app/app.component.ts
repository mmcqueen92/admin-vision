import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin-vision-client';
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.loading$.next(true);
      }
      if (
        ev instanceof NavigationEnd ||
        ev instanceof NavigationCancel ||
        ev instanceof NavigationError
      ) {
        this.loading$.next(false);
      }
    });
  }
}
