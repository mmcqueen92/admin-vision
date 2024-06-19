import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { NewsletterControllerService } from '../api/services';
@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
})
export class NewsletterComponent {
  constructor(private newsletterService: NewsletterControllerService) {}
  newsletterForm: FormGroup = new FormGroup({
    message_input: new FormControl(''),
    subject_input: new FormControl(''),
  });

  showPreview: boolean = false;
  responseMessage: string | null = null;

  sendNewsletter() {
    console.log('SEND NEWSLETTER');
    const message = this.newsletterForm.get('message_input')?.value;
    const subject = this.newsletterForm.get('subject_input')?.value;
    if (message && subject) {
      this.newsletterService
        .sendNewsletter({
          body: {
            message,
            subject,
          },
        })
        .subscribe({
          next: (response: any) => {
            this.responseMessage = response.message;
            this.newsletterForm.setValue({
              message_input: '',
              subject_input: '',
            });
            this.showPreview = false;
          },
          error: (e: any) => {
            console.error('ERROR: ', e);
          },
        });
    } else {
      console.error('Message is required');
      // Optionally show an error message to the user
    }
    this.newsletterService.sendNewsletter();
  }

  previewEmail() {
    console.log('PREVIEW EMAIL');
    this.showPreview = true;
  }
}
