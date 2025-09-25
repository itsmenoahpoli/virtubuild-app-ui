import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { SigninComponent } from './features/auth/signin/signin.component';
import { InstructorHomeComponent } from './features/dashboard/instructor/instructor-home/instructor-home.component';
import { StudentDashboardComponent } from './features/dashboard/student/student-dashboard.component';
import { ActivitiesListComponent } from './features/student/activities/activities-list.component';
import { ActivityDetailComponent } from './features/student/activities/activity-detail.component';
import { GradesPageComponent } from './features/student/grades/grades-page.component';
import { AnalyticsPageComponent } from './features/student/analytics/analytics-page.component';
import { ManageModulesComponent } from './features/instructor/manage-modules/manage-modules.component';
import { InstructorGradesComponent } from './features/instructor/grades/instructor-grades.component';
import { AssessmentEditorComponent } from './features/instructor/assessments/assessment-editor.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'student',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['student'] },
    children: [
      { path: '', component: StudentDashboardComponent },
      { path: 'activities', component: ActivitiesListComponent },
      { path: 'activities/:id', component: ActivityDetailComponent },
      { path: 'grades', component: GradesPageComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
    ],
  },
  {
    path: 'instructor',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['instructor'] },
    children: [
      { path: '', component: InstructorHomeComponent },
      { path: 'manage-modules', component: ManageModulesComponent },
      { path: 'grades', component: InstructorGradesComponent },
      { path: 'assessments/:moduleId', component: AssessmentEditorComponent },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
