import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class TesterGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userService.getCurrentUser() != undefined && this.userService.getCurrentUser().usertype == 'Tester') {
      return true;
    }

    this.router.navigate(['./']);
    if (this.userService.getCurrentUser() != undefined && this.userService.getCurrentUser().usertype != 'Tester') {
      alert('Access denied.');
    } else {
      alert('Access denied, please login.');
    }
    return false;
  }

}
