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

// NEW COMPONENTS
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './features/admin/users/user-management.component';
import { StudentGroupsManagementComponent } from './features/admin/student-groups/student-groups-management.component';
import { PcAssemblySimulationComponent } from './features/student/simulation/pc-assembly-simulation.component';
import { GamificationDashboardComponent } from './features/student/gamification/gamification-dashboard.component';
import { ProgressTrackingComponent } from './features/student/progress/progress-tracking.component';
import { AssessmentSubmissionsComponent } from './features/student/assessments/assessment-submissions.component';

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
      { path: 'simulation/:activityId', component: PcAssemblySimulationComponent },
      { path: 'grades', component: GradesPageComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
      { path: 'progress', component: ProgressTrackingComponent },
      { path: 'gamification', component: GamificationDashboardComponent },
      { path: 'assessments', component: AssessmentSubmissionsComponent },
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
      { path: 'student-groups', component: StudentGroupsManagementComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'student-groups', component: StudentGroupsManagementComponent },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
