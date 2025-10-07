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
import { Store } from '@ngrx/store';
import { setUserProfile, setUserType } from '@/app/core/store/user/user.actions';
import { Router } from '@angular/router';
import { FormInputComponent } from '@/app/shared/components/ui/form/form-input/form-input.component';
import { RadioGroupComponent } from '@/app/shared/components/ui/form/radio-group/radio-group.component';
import { getErrorMessage } from '@/app/shared/utils/form.utils';
import { USER_TYPES } from '@/app/shared/utils/types.utils';
import { SystemService } from '@/app/core/services';

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

  healthStatus: 'checking' | 'ok' | 'fail' = 'checking';
  healthMessage = '';

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['student', Validators.required],
    });
    this.runHealthcheckWithRetry();
  }

  private async runHealthcheckWithRetry(maxAttempts: number = 5) {
    let attempt = 0;
    let delayMs = 500;
    this.healthStatus = 'checking';
    this.healthMessage = 'Checking API connectivity...';

    while (attempt < maxAttempts) {
      try {
        const result = await SystemService.healthCheck();
        this.healthStatus = 'ok';
        this.healthMessage = 'API connected';
        console.info('Healthcheck result:', result);
        return;
      } catch (err: any) {
        attempt++;
        this.healthStatus = 'checking';
        this.healthMessage = `Retrying API connectivity (${attempt}/${maxAttempts})...`;
        console.warn('Healthcheck attempt failed:', err);
        if (attempt >= maxAttempts) break;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs = Math.min(delayMs * 2, 8000);
      }
    }

    this.healthStatus = 'fail';
    this.healthMessage = 'API unreachable';
  }

  async onSubmit() {
    if (this.signinForm.valid && this.healthStatus === 'ok') {
      const { email, password, userType } = this.signinForm.value;
      const decoded = await AuthenticationService.signin(email, password, userType);
      const role = decoded?.user?.roleName || decoded?.user?.role;
      const id = decoded?.user?.id || decoded?.user?.userId || undefined;
      const name = decoded?.user?.name || decoded?.user?.fullName || decoded?.user?.email || '';
      const avatar = decoded?.user?.avatar || undefined;
      this.store.dispatch(setUserType({ userType: (role || '').toLowerCase() } as any));
      this.store.dispatch(setUserProfile({ id, name, email, avatar }));
      if (role?.toLowerCase() === 'instructor') {
        this.router.navigate(['/instructor']);
      } else {
        this.router.navigate(['/student']);
      }
    }
  }

  getErrorMessage(controlName: string): string {
    return getErrorMessage(this.signinForm.get(controlName), controlName);
  }
}
