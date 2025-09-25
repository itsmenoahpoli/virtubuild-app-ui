import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesService, ModulesService } from '@/app/core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
})
export class ActivitiesListComponent implements OnInit {
  @Input() moduleId?: number;
  modules: any[] = [];
  activities: any[] = [];

  async ngOnInit() {
    const mods = await ModulesService.list();
    this.modules = mods?.data || [];
    const targetModuleId = this.moduleId || this.modules?.[0]?.id;
    if (targetModuleId) {
      const res = await ActivitiesService.listByModule(targetModuleId);
      this.activities = res?.data || [];
    }
  }
}


