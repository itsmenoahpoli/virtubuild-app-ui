import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsService } from '@/app/core/services';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assessment-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assessment-editor.component.html',
  styleUrls: ['./assessment-editor.component.scss'],
})
export class AssessmentEditorComponent implements OnInit {
  form: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({ content: [''] });
  }

  async ngOnInit() {
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    const res = await AssessmentsService.getByModule(moduleId);
    const quiz = res?.data?.quiz || {};
    this.form.patchValue({ content: JSON.stringify(quiz) });
  }

  async save() {
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    const content = this.form.value.content;
    await AssessmentsService.upsert(moduleId, JSON.parse(content || '{}'));
    alert('Saved');
  }
}


