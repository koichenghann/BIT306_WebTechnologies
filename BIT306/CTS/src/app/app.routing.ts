import { Routes, RouterModule } from "@angular/router";
import { PatientGuard } from "./User/RouteGuard/patient.guard";
import { TesterGuard } from "./User/RouteGuard/tester.guard";
import { TestCentreManagerGuard } from "./User/RouteGuard/test-centre-manager.guard";

import { TestCentreFormComponent } from './TestCentre/test-centre-form/test-centre-form.component';
import { TestCentreProfileComponent } from './TestCentre/test-centre-profile/test-centre-profile.component';
import { HomeComponent } from './Home/home.component';
import { CtsLoginComponent } from './CTS-Login/login.component';
import { CtsSignupComponent } from './CTS-Signup/signup.component';
import { PatientDashboardComponent } from './Patient/Patient-dashboard/patient-dashboard.component';
import { PatientViewHistoryComponent } from './Patient/Patient-view-history/patient-view-history.component'
import { TesterDashboardComponent } from './Tester/Tester-dashboard/tester-dashboard.component';
import { TesterNewTestComponent } from './Tester/Tester-new-test/tester-new-test.component';
import { TesterUpdateTestComponent } from './Tester/Tester-update-test/tester-update-test.component';

const APP_ROUTES: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'1', redirectTo: '/test-centre-forms', pathMatch: 'full'},
  {path:'2', redirectTo: '/test-centre-profile', pathMatch: 'full'},
  {path:'3', redirectTo: '/signup', pathMatch: 'full'},
  {path:'4', redirectTo: '/login', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'test-centre-form', component: TestCentreFormComponent/*, canActivate: [TestCentreManagerGuard]*/},
  {path:'test-centre-profile', component: TestCentreProfileComponent/*, canActivate: [TestCentreManagerGuard]*/},
  {path:'signup', component: CtsSignupComponent},
  {path:'login', component: CtsLoginComponent},
  {path:'patient-dashboard', component: PatientDashboardComponent},
  {path:'patient-view-history', component: PatientViewHistoryComponent},
  {path:'tester-dashboard', component: TesterDashboardComponent},
  {path:'tester-new-test', component: TesterNewTestComponent},
  {path:'tester-update-test', component: TesterUpdateTestComponent}

];

export const routing = RouterModule.forRoot(APP_ROUTES);
