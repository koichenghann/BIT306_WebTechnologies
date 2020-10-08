import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../../User/user.service';

@Component({
  selector:'officer-nav',
  templateUrl:'officer-nav.component.html',
  styleUrls: ['officer-nav.component.css']
})

export class OfficerNavComponent {
  //@ViewChild('sidenav') sidenav: MatSidenav;
  //reason = '';
  //close(reason: string) {
    //this.reason = reason;
    //this.sidenav.close();
  //}
  //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public userService: UserService) {

    //userType = this.userService.getCurrentUser();
  }

  logout() {
    //this.authService.logout();
  }

  //titleName(){
    //if (this.userType=='officer'){
      //return 'CTIS | Officer';
    //}

    //if (this.userType=='manager'){
      //return 'CTIS | manager';
   //}


}
