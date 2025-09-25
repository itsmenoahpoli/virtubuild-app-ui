import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { clearUser } from '@/app/core/store/user';

interface UserProfile {
  name: string;
  avatar?: string;
}

@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss'],
})
export class DashboardNavbarComponent {
  @Input() userProfile: UserProfile | null = null;
  faBars = faBars;
  faSignOutAlt = faSignOutAlt;

  constructor(private store: Store, private router: Router) {}

  onLogout() {
    this.store.dispatch(clearUser());
    this.router.navigate(['/signin']);
  }
}
