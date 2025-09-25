import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';
import { USER_TYPES } from '@/app/shared/utils/types.utils';
import { selectUserType, selectUserProfile } from '@/app/core/store/user';

interface UserProfile {
  name: string;
  avatar?: string;
}

interface SidebarItem {
  label: string;
  route: string;
  icon?: string;
  children?: SidebarItem[];
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardSidebarComponent,
    DashboardNavbarComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  @Input() appTitle!: string;
  userType$;
  userProfile$;
  currentUserType: USER_TYPES | null = null;

  constructor(private store: Store) {
    this.userType$ = this.store.select(selectUserType);
    this.userProfile$ = this.store.select(selectUserProfile);
  }

  ngOnInit() {
    this.userType$.subscribe((type) => {
      this.currentUserType = type;
    });
  }

  get sidebarItems(): SidebarItem[] {
    if (!this.currentUserType) return [];

    switch (this.currentUserType) {
      case USER_TYPES.ADMIN:
        return [
          {
            label: 'Manage Instructors',
            route: '/admin/instructors',
            icon: 'person',
          },
          {
            label: 'Manage Students',
            route: '/admin/students',
            icon: 'school',
          },
          {
            label: 'Manage Contents',
            route: '/admin/contents',
            icon: 'menu_book',
            children: [
              {
                label: 'Quizzes',
                route: '/admin/contents/quizzes',
              },
              {
                label: 'Laboratories',
                route: '/admin/contents/laboratories',
              },
              {
                label: 'Assessments',
                route: '/admin/contents/assessments',
              },
            ],
          },
        ];
      case USER_TYPES.INSTRUCTOR:
        return [
          {
            label: 'Manage Laboratory Activities',
            route: '/instructor/laboratories',
            icon: 'science',
          },
          {
            label: 'Manage Assessments',
            route: '/instructor/assessments',
            icon: 'assignment',
          },
          {
            label: 'Manage Student Grades',
            route: '/instructor/grades',
            icon: 'grade',
          },
        ];
      case USER_TYPES.STUDENT:
        return [
          {
            label: 'View Assessments',
            route: '/student/assessments',
            icon: 'assignment',
          },
          {
            label: 'View Quizzes',
            route: '/student/quizzes',
            icon: 'quiz',
          },
          {
            label: 'View Laboratory Activities',
            route: '/student/laboratories',
            icon: 'science',
          },
          {
            label: 'View Gradebook',
            route: '/student/gradebook',
            icon: 'grade',
          },
          {
            label: 'Laboratory Simulator',
            route: '/student/simulator',
            icon: 'biotech',
          },
        ];
      default:
        return [];
    }
  }
}
