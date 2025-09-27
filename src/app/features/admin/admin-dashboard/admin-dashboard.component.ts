import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '@/app/core/services';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  dashboardStats: any = {};
  loading = true;

  async ngOnInit() {
    try {
      this.dashboardStats = await AdminService.getDashboardStats();
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      this.loading = false;
    }
  }
}
