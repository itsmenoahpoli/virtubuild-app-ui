import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesService } from '@/app/core/services';

@Component({
  selector: 'app-grades-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss'],
})
export class GradesPageComponent implements OnInit {
  grades: any[] = [];

  async ngOnInit() {
    const res = await GradesService.listMine();
    this.grades = res?.data || [];
  }
}


