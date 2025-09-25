import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesService, ActivitiesService, ModulesService } from '@/app/core/services';

@Component({
  selector: 'app-instructor-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructor-grades.component.html',
  styleUrls: ['./instructor-grades.component.scss'],
})
export class InstructorGradesComponent implements OnInit {
  modules: any[] = [];
  activities: any[] = [];
  grades: any[] = [];

  async ngOnInit() {
    const res = await ModulesService.list();
    this.modules = res?.data || [];
    if (this.modules[0]) {
      const acts = await ActivitiesService.listByModule(this.modules[0].id);
      this.activities = acts?.data || [];
      if (this.activities[0]) {
        const gs = await GradesService.listForActivity(this.activities[0].id);
        this.grades = gs?.data || [];
      }
    }
  }
}


