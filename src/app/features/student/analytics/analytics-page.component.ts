import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '@/app/core/services';

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements OnInit {
  analytics: any[] = [];

  async ngOnInit() {
    const res = await AnalyticsService.getMine();
    this.analytics = res?.data || [];
  }
}


