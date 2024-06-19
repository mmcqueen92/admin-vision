import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'analytics', component: AnalyticsComponent},
  { path: 'newsletter', component: NewsletterComponent}
];
