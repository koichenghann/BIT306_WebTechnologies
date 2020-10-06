import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { sidenavComponent } from './side-nav-component/side-nav.component'


import { CtsLoginComponent } from './CTS-Login/login.component';
import { CtsSignupComponent } from './CTS-Signup/signup.component';
import { HomeComponent } from './Home/home.component';
import { TestCentreFormComponent } from './TestCentre/test-centre-form/test-centre-form.component';
import { TestCentreProfileComponent } from './TestCentre/test-centre-profile/test-centre-profile.component';
import { PatientDashboardComponent } from'./Patient/Patient-dashboard/patient-dashboard.component';
import { PatientNavComponent } from'./Patient/Patient-nav/patient-nav.component';

import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';



// const appRoutes: Routes = [
//   {path: 'TestCentreForm', component: TestCentreFormComponent}
//   //{path: 'list', component: PostListComponent}
// ];

@NgModule({
  declarations: [
    AppComponent,
    CtsLoginComponent,
    CtsSignupComponent,
    HomeComponent,
    sidenavComponent,
    TestCentreFormComponent,
    TestCentreProfileComponent,
    PatientDashboardComponent,
    PatientNavComponent

  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    MatMenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
