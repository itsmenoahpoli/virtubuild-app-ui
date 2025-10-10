import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '@/app/shared/components/layouts/dashboard/dashboard-layout/dashboard-layout.component';
import { PageShellComponent } from '@/app/shared/components/layouts/page-shell/page-shell.component';
import { GradesService, ActivitiesService, ModulesService } from '@/app/core/services';

@Component({
  selector: 'app-instructor-grades',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardLayoutComponent, PageShellComponent],
  templateUrl: './instructor-grades.component.html',
  styleUrls: ['./instructor-grades.component.scss'],
})
export class InstructorGradesComponent implements OnInit {
  modules: any[] = [];
  activities: any[] = [];
  grades: any[] = [];

  async ngOnInit() {
    const acts = await ActivitiesService.list();
    this.activities = acts?.data || [];
    if (this.activities[0]) {
      const gs = await GradesService.listForActivity(this.activities[0].id);
      this.grades = gs?.data || [];
    }
  }
}


