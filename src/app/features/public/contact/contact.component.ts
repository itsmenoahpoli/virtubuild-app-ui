import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '@/app/shared/components/layouts/auth-layout/auth-layout.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AuthLayoutComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form = { name: '', email: '', message: '' };
  submitted = false;

  async submit() {
    this.submitted = true;
  }
}


