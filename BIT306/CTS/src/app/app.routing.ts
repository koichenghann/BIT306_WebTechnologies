import { Routes, RouterModule } from "@angular/router";
import { TestCentreFormComponent } from './TestCentre/test-centre-form/test-centre-form.component';
import { TestCentreProfileComponent } from './TestCentre/test-centre-profile/test-centre-profile.component';
import { HomeComponent } from './Home/home.component';
import { PatientDashboardComponent } from './Patient/Patient-dashboard/patient-dashboard.component';


const APP_ROUTES: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'1', redirectTo: '/test-centre-forms', pathMatch: 'full'},
  {path:'2', redirectTo: '/test-centre-profile', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'test-centre-forms', component: TestCentreFormComponent},
  {path:'test-centre-profile', component: TestCentreProfileComponent},
  {path:'patient-dashboard', component: PatientDashboardComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
