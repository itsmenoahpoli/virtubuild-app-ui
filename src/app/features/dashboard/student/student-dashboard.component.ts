import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesService, AnalyticsService } from '@/app/core/services';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  modules: any[] = [];
  analytics: any[] = [];

  async ngOnInit() {
    const modulesRes = await ModulesService.list();
    this.modules = modulesRes?.data || [];
    const analyticsRes = await AnalyticsService.getMine();
    this.analytics = analyticsRes?.data || [];
  }
}


