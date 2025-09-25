import { Component } from '@angular/core';
import { AppHeaderComponent } from '@/app/shared/components/shared/app-header/app-header.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '@/app/core/services';
import { FormInputComponent } from '@/app/shared/components/ui/form/form-input/form-input.component';
import { RadioGroupComponent } from '@/app/shared/components/ui/form/radio-group/radio-group.component';
import { getErrorMessage } from '@/app/shared/utils/form.utils';
import { USER_TYPES } from '@/app/shared/utils/types.utils';

@Component({
  selector: 'app-signin',
  imports: [
    AppHeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    FormInputComponent,
    RadioGroupComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  headerLinks = [
    { label: 'Contact', path: '/contact' },
    { label: 'About Us', path: '/about-us' },
  ];

  signinForm: FormGroup;
  userTypeOptions = [
    { label: 'Instructor', value: USER_TYPES.INSTRUCTOR },
    { label: 'Student', value: USER_TYPES.STUDENT },
    { label: 'Admin', value: USER_TYPES.ADMIN },
  ];

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['student', Validators.required],
    });
  }

  async onSubmit() {
    if (this.signinForm.valid) {
      const { email, password, userType } = this.signinForm.value;
      const decoded = await AuthenticationService.signin(email, password, userType);
      const role = decoded?.user?.roleName || decoded?.user?.role;
      if (role?.toLowerCase() === 'instructor') {
        window.location.href = '/instructor';
      } else {
        window.location.href = '/student';
      }
    }
  }

  getErrorMessage(controlName: string): string {
    return getErrorMessage(this.signinForm.get(controlName), controlName);
  }
}
