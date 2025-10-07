import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GamificationService } from '@/app/core/services';
import { DashboardLayoutComponent } from '@/app/shared/components/layouts/dashboard/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-gamification-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardLayoutComponent],
  templateUrl: './gamification-dashboard.component.html',
  styleUrls: ['./gamification-dashboard.component.scss']
})
export class GamificationDashboardComponent implements OnInit {
  appTitle = 'VirtuBuild';
  gamificationData: any = {};
  leaderboard: any[] = [];
  topPerformers: any[] = [];
  myRank: number = 0;
  loading = true;

  async ngOnInit() {
    try {
      await this.loadGamificationData();
    } catch (error) {
      console.error('Error loading gamification data:', error);
    } finally {
      this.loading = false;
    }
  }

  async loadGamificationData() {
    this.gamificationData = await GamificationService.getMyData();
    this.leaderboard = await GamificationService.getLeaderboard();
    this.topPerformers = await GamificationService.getTopPerformers();
    this.myRank = await GamificationService.getMyRank();
  }

  async checkAchievements() {
    try {
      await GamificationService.checkAchievements();
      await this.loadGamificationData();
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  }

  getLevelProgress() {
    if (!this.gamificationData.totalPoints) return 0;
    const currentLevelPoints = this.gamificationData.level * 1000;
    const nextLevelPoints = (this.gamificationData.level + 1) * 1000;
    const progress = ((this.gamificationData.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return Math.max(0, Math.min(100, progress));
  }

  getNextLevelPoints() {
    return (this.gamificationData.level + 1) * 1000;
  }
}
