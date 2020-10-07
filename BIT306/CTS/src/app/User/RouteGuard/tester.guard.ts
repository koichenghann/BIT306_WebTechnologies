import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class TesterGuard implements CanActivate {
  constructor(public userService: UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userService.getCurrentUser() != undefined && this.userService.getCurrentUser().usertype == 'tester') {
      return true;
    }
    alert('Sorry, you are not authorized for this part of the system.');
    return false;
  }

}
