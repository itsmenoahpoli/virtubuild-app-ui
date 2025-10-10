import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '@/app/shared/components/layouts/dashboard/dashboard-layout/dashboard-layout.component';
import { PageShellComponent } from '@/app/shared/components/layouts/page-shell/page-shell.component';
import { AssessmentsService } from '@/app/core/services';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-assessment-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DashboardLayoutComponent, PageShellComponent],
  templateUrl: './assessment-editor.component.html',
  styleUrls: ['./assessment-editor.component.scss'],
})
export class AssessmentEditorComponent implements OnInit {
  form: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({ content: [''] });
  }

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
  }

  async ngOnInit() {
    const labActivityId = Number(this.route.snapshot.paramMap.get('labActivityId'));
    const res = await AssessmentsService.getByLabActivity(labActivityId);
    const quiz = res?.data?.quiz || {};
    this.form.patchValue({ content: JSON.stringify(quiz) });
  }

  async save() {
    const labActivityId = Number(this.route.snapshot.paramMap.get('labActivityId'));
    const content = this.form.value.content;
    const assessmentData = {
      labActivityId,
      ...JSON.parse(content || '{}')
    };
    await AssessmentsService.create(assessmentData);
    alert('Saved');
  }
}


