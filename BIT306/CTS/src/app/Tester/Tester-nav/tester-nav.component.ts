import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector:'tester-nav',
  templateUrl:'tester-nav.component.html',
  styleUrls: ['tester-nav.component.css']
})

export class TesterNavComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    constructor(private breakpointObserver: BreakpointObserver) {}
      userType = 'Tester';
      //userType    = this.getUserType();

      //decrlaring variables
      list_item_1 = '';
      list_item_2 = '';
      list_item_3 = '';
      list_item_4 = '';
      list_item_5 = '';
      list_item_6 = '';

      //declare variables
      route1;
      route2;
      route3;
      route4;
      route5;
      route6;


      titleName(){
        if (this.userType=='Tester'){
          return 'CTIS | Patient';
        }

        //if (this.userType==''){
          //return 'CTIS | ';
       // }

      }
      ngOnInit(){

        if (this.userType=='Tester'){
          this.list_item_1 = 'Dashboard';
          this.list_item_2 = 'Manage Profile';
          this.list_item_3 = 'Record New Test';
          this.list_item_4 = 'Update Test Result';
          //this.list_item_5 = 'Add New Collection';
          this.list_item_6 = 'Logout';

          this.route1 = '/tester-dashboard';
          this.route2 = '/tester-manage-profile';
          this.route3 = '/tester-new-test';
          this.route4 = '/tester-update-test';
          //this.route5 = '/add-submission';
          //this.route6 = '';

        }



      }

      logout(){
        //this.auhtService.logout();
      }

  }

