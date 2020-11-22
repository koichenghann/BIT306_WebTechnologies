import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { sidenavComponent } from './side-nav-component/side-nav.component'

import { UserService } from './User/user.service';

import { OfficerNavComponent } from './Officer/officer-nav/officer-nav.component'
import { OfficerDashboardComponent } from './Officer/test-centre-officer-dashboard/officer-dashboard.component';
import { ManagerDashboardComponent } from './TestCentre/test-centre-manager-dashboard/manager-dashboard.component';
import { CtsLoginComponent } from './CTS-Login/login.component';
import { CtsSignupComponent } from './CTS-Signup/signup.component';
import { HomeComponent } from './Home/home.component';
import { TestCentreFormComponent } from './TestCentre/test-centre-form/test-centre-form.component';
import { TestCentreProfileComponent } from './TestCentre/test-centre-profile/test-centre-profile.component';
import { TestKitFormComponent } from './TestKit/test-kit-form/test-kit-form.component';
import { TestKitTableComponent } from './TestKit/test-kit-table/test-kit-table.component';

import { PatientDashboardComponent } from'./Patient/Patient-dashboard/patient-dashboard.component';
import { PatientNavComponent } from'./Patient/Patient-nav/patient-nav.component';
import { PatientViewHistoryComponent } from './Patient/Patient-view-history/patient-view-history.component';
import { PatientTableDetailsComponent } from './Patient/Patient-table-details/patient-table-details.component';

import { TesterDashboardComponent } from './Tester/Tester-dashboard/tester-dashboard.component';
import { TesterNavComponent } from './Tester/Tester-nav/tester-nav.component';
import { TesterNewTestComponent } from './Tester/Tester-new-test/tester-new-test.component';
import { TesterUpdateTestComponent } from './Tester/Tester-update-test/tester-update-test.component';
import { TesterFormDialogComponent } from'./Tester/Tester-form/Tester-form-dialog/tester-form.dialog.component';
import { TesterFormComponent } from'./Tester/Tester-form/tester-form.component';
import { TesterUpdateTableComponent } from './Tester/Tester-table/tester-update-table.component';
import { TesterUpdateFormDialogComponent } from './Tester/Tester-update-form-dialog/tester-update-form-dialog.component';
import { TesterViewDetailsComponent } from './Tester/Tester-view-details/tester-view-details.component';

import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//Angular Material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TesterManagementTableComponent } from './TesterManagement/tester-management-table/tester-management-table.component';
import { TesterManagementFormComponent } from './TesterManagement/tester-management-form/tester-management-form.component';
import { TestReportTableComponent } from './TestReport/test-report-table/test-report-table.component';
import { TestReportDetailComponent } from './TestReport/test-report-detail/test-report-detail.component';







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
    ManagerDashboardComponent,
    PatientDashboardComponent,
    PatientNavComponent,
    PatientViewHistoryComponent,
    PatientTableDetailsComponent,
    TesterDashboardComponent,
    TesterNavComponent,
    TesterNewTestComponent,
    TesterUpdateTestComponent,
    TesterUpdateTableComponent,
    TesterUpdateFormDialogComponent,
    TesterViewDetailsComponent,
    TesterFormDialogComponent,
    TesterFormComponent,
    TestKitFormComponent,
    TestKitTableComponent,
    TesterManagementTableComponent,
    TesterManagementFormComponent,
    TestReportTableComponent,
    OfficerDashboardComponent,
    OfficerNavComponent,
    TestReportDetailComponent


  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
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
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    HttpClientModule,
    MatProgressSpinnerModule

  ],
  providers: [
    UserService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents:[
    TesterNewTestComponent,
    TesterFormComponent,
    TesterFormDialogComponent,
    TesterUpdateFormDialogComponent
  ]

})
export class AppModule { }
