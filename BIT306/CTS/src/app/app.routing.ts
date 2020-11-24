import { Routes, RouterModule } from "@angular/router";
import { PatientGuard } from "./User/RouteGuard/patient.guard";
import { TesterGuard } from "./User/RouteGuard/tester.guard";
import { TestCentreManagerGuard } from "./User/RouteGuard/test-centre-manager.guard";
import { TestCentreOfficerGuard } from "./User/RouteGuard/test-centre-officer.guard";

import { TestCentreFormComponent } from './TestCentre/test-centre-form/test-centre-form.component';
import { TestCentreProfileComponent } from './TestCentre/test-centre-profile/test-centre-profile.component';
import { OfficerDashboardComponent } from './Officer/test-centre-officer-dashboard/officer-dashboard.component'
import { ManagerDashboardComponent } from './TestCentre/test-centre-manager-dashboard/manager-dashboard.component'
import { HomeComponent } from './Home/home.component';
import { CtsLoginComponent } from './CTS-Login/login.component';
import { CtsSignupComponent } from './CTS-Signup/signup.component';
import { PatientDashboardComponent } from './Patient/Patient-dashboard/patient-dashboard.component';
import { PatientViewHistoryComponent } from './Patient/Patient-view-history/patient-view-history.component';
import { PatientTableDetailsComponent } from './Patient/Patient-table-details/patient-table-details.component';
import { TesterDashboardComponent } from './Tester/Tester-dashboard/tester-dashboard.component';
import { TesterNewTestComponent } from './Tester/Tester-new-test/tester-new-test.component';
import { TesterUpdateTestComponent } from './Tester/Tester-update-test/tester-update-test.component';
import { TesterViewDetailsComponent } from './Tester/Tester-view-details/tester-view-details.component'
import { TestKitTableComponent } from './TestKit/test-kit-table/test-kit-table.component';
import { TestKitFormComponent } from './TestKit/test-kit-form/test-kit-form.component';
import { TesterManagementTableComponent } from './TesterManagement/tester-management-table/tester-management-table.component';
import { TesterManagementFormComponent } from './TesterManagement/tester-management-form/tester-management-form.component';
import { TestReportTableComponent } from './TestReport/test-report-table/test-report-table.component';
import { TestReportDetailComponent } from './TestReport/test-report-detail/test-report-detail.component';

const APP_ROUTES: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'1', redirectTo: '/test-centre-forms', pathMatch: 'full'},
  {path:'2', redirectTo: '/test-centre-profile', pathMatch: 'full'},
  {path:'3', redirectTo: '/signup', pathMatch: 'full'},
  {path:'4', redirectTo: '/login', pathMatch: 'full'},
  {path:'5', redirectTo: '/test-kit-table', pathMatch: 'full'},
  {path:'6', redirectTo: '/test-kit-form', pathMatch: 'full'},
  {path:'7', redirectTo: '/tester-management-table', pathMatch: 'full'},
  {path:'8', redirectTo: '/tester-management-table/form', pathMatch: 'full'},
  {path:'9', redirectTo: '/test-report', pathMatch: 'full'},

  {path:'home', component: HomeComponent},
  {path:'signup', component: CtsSignupComponent},
  {path:'login', component: CtsLoginComponent},
  {path:'test-report', component: TestReportTableComponent},
  {path:'test-report/detail', component: TestReportDetailComponent},

  {path:'patient-dashboard', component: PatientDashboardComponent},
  {path:'patient-view-history', component: PatientViewHistoryComponent},
  {path:'patient-view-history/detail', component: PatientTableDetailsComponent},

  {path:'tester-dashboard', component: TesterDashboardComponent},
  {path:'tester-new-test', component: TesterNewTestComponent},
  {path:'tester-update-test', component: TesterUpdateTestComponent},
  {path:'tester-update-test/details', component: TesterViewDetailsComponent},

  {path:'officer-dashboard', component: OfficerDashboardComponent},
  {path:'manager-dashboard', component: ManagerDashboardComponent, canActivate: [TestCentreManagerGuard]},
  {path:'test-centre-profile', component: TestCentreProfileComponent, canActivate: [TestCentreManagerGuard]},
  {path:'test-centre-profile/form', component: TestCentreFormComponent, canActivate: [TestCentreManagerGuard]},
  {path:'test-kit-table', component: TestKitTableComponent, canActivate: [TestCentreManagerGuard]},
  {path:'test-kit-table/form', component: TestKitFormComponent, canActivate: [TestCentreManagerGuard]},
  {path:'tester-management-table', component: TesterManagementTableComponent, canActivate: [TestCentreManagerGuard]},
  {path:'tester-management-table/form', component: TesterManagementFormComponent, canActivate: [TestCentreManagerGuard]}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
