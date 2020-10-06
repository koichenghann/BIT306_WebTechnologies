import { Routes, RouterModule } from "@angular/router";
import { TestCentreFormComponent } from './TestCentre/test-centre-form/test-centre-form.component';
import { TestCentreProfileComponent } from './TestCentre/test-centre-profile/test-centre-profile.component';
import { HomeComponent } from './Home/home.component';
import { CtsLoginComponent } from './CTS-Login/login.component';
import { CtsSignupComponent } from './CTS-Signup/signup.component';


const APP_ROUTES: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'1', redirectTo: '/test-centre-forms', pathMatch: 'full'},
  {path:'2', redirectTo: '/test-centre-profile', pathMatch: 'full'},
  {path:'3', redirectTo: '/signup', pathMatch: 'full'},
  {path:'4', redirectTo: '/login', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'test-centre-forms', component: TestCentreFormComponent},
  {path:'test-centre-profile', component: TestCentreProfileComponent},
  {path:'signup', component: CtsSignupComponent},
  {path:'login', component: CtsLoginComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
