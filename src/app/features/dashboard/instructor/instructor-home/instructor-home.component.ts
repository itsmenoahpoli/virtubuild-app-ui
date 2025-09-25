import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '@/app/shared/components/layouts/dashboard/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-instructor-home',
  standalone: true,
  imports: [DashboardLayoutComponent],
  templateUrl: './instructor-home.component.html',
  styleUrl: './instructor-home.component.scss',
})
export class InstructorHomeComponent {
  appTitle = 'VituBuild';
}
