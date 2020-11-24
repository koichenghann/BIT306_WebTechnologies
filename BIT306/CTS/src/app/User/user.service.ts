import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { Subject } from 'rxjs';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token: string;
  private authStatusListener = new Subject<boolean>();
  private loginResponseListener = new Subject<any>();
  private usernameValidatedListener = new Subject<any>();

  private testerRetrievedListener = new Subject<any>();
  private userUpdatedListener = new Subject<any>();
  private userDeletedListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router:Router, private _snackBar: MatSnackBar) { }

  private users: User[] = [];
  private currentUser: User;
  private selectedTester: User;




  test(){

  }



  getToken() {
  return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getLoginResponseListner() {
    return this.loginResponseListener.asObservable();
  }
  getUsernameValidatedListerner() {
    return this.usernameValidatedListener.asObservable();
  }
  getTesterRetrievedListener() {
    return this.testerRetrievedListener;
  }
  getUserUpdatedListener() {
    return this.userUpdatedListener;
  }
  getUserDeletedListener() {
    return this.userDeletedListener;
  }

  register(username: string, password: string, usertype: string, contact: string, address: string, centre: string) {
    // const user: User = {username: email, password: password};
    const user: User = {id: null, username:username, password:password, usertype:usertype, contact:contact, address:address, centre:centre};
    this.http.post('http://localhost:3000/api/user/signup', user)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
        this.openSnackBar('Account registered successfully.', null);
      });
  }
  createTester(username: string, password: string, centre: string) {
    // const user: User = {username: email, password: password};
    const user: User = {id: null, username:username, password:password, usertype:'Tester', contact:null, address:null, centre:centre};
    this.http.post('http://localhost:3000/api/user/signup', user)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/tester-management-table']);
        this.openSnackBar('Test Officer account created successfully.', null);
      });
  }

  login(username: string, password: string){
    const user: User = {id: null, username:username, password:password, usertype:null, contact:null, address:null, centre:null};
    this.http.post <{token: string, user: any, message: string}> ('http://localhost:3000/api/user/login', user)
      .subscribe( response => {
        // alert('ran');
        console.log('logged in');
        console.log(response.user);
        const token = response.token;
        const fetchedUser = {id: response.user._id, username:response.user.username, password:null, usertype:response.user.usertype, contact:response.user.contact, address:response.user.address, centre:response.user.centre};
        this.token = token;
        this.setCurrentUser(fetchedUser);
        this.authStatusListener.next(true);
        this.loginResponseListener.next(true);
        // this.router.navigate(['/']);
        switch (fetchedUser.usertype) {
          case 'Patient':
            this.router.navigate(['/patient-dashboard']);
            break;

          case 'Officer':
            this.router.navigate(['/signup']);
            break;

          case 'Tester':
            this.router.navigate(['/tester-dashboard']);
            break;

          case 'TestCentreManager':
            this.router.navigate(['/manager-dashboard']);
            break;
        }
        // alert(fetchedUser.usertype);
      }, (error) => {
        // alert('error');
        this.loginResponseListener.next(error);
      });
  }

  logout(){
    this.token = null;
    this.authStatusListener.next(false);
    // this.router.navigate(['/']);
  }

  checkUsernameIsUnique(username: string){
    // this.downloadUsers();
    // if(this.users.find(user => user.username == username)){
    //   return false;
    // }
    // const user: User = {id: null, username:username, password:password, usertype:usertype, contact:contact, address:address, centre:centre};
    this.http.post('http://localhost:3000/api/user/usernameIsUnique', {username: username})
      .subscribe(response => {
        console.log(response);
        this.usernameValidatedListener.next(response);
      }, (error) => {
        this.usernameValidatedListener.next(error.error);
      });

    return true;
  }

  generateID() {
    this.downloadUsers();
    //return "U"+(this.users.length + 1);
    // console.log(this.users[this.users.length]);
    if ( this.users.length > 0 ) {
      return "U" + (parseInt(this.users[this.users.length-1].id.replace('U',''), 10)+1);
    }
    return 'U1';
  }




  //methods related to selected User
  setSelectedTester(tester: User){
    this.selectedTester = tester;
    this.uploadSelectedTester();
  }
  getSelectedTester(){
    this.downloadSelectedTester();
    return this.selectedTester;
  }
  clearSelectedTester(){
    this.selectedTester = undefined;
    this.RemoveSelectedTester();
  }
  uploadSelectedTester(){
    localStorage.setItem('selectedTester', JSON.stringify(this.selectedTester));
  }
  downloadSelectedTester(){
    this.selectedTester = JSON.parse(localStorage.getItem('selectedTester'));
  }
  RemoveSelectedTester(){
    localStorage.removeItem('selectedTester')
  }





  getCurrentUser(){
    this.downloadCurrentUser();
    return this.currentUser;
  }
  setCurrentUser(user: User){
    console.log('setCurrentUser ran');
    console.log(user);
    this.downloadCurrentUser();
    this.currentUser = user;
    this.uploadCurrentUser();
  }

  updateCurrentUser(username: string, password: string, usertype: string, contact: string, address: string, centre: string){
    var id = this.getCurrentUser().id;
  }

  updateUser(id: string, username: string, password: string, usertype: string, contact: string, address: string, centre: string) {
    const user = {
      id: id,
      username: username,
      password: password,
      contact: contact,
      address: address,
      centre: centre
    }

    this.http.post('http://localhost:3000/api/user/update', user).subscribe( response => {
      console.log('user updated succefully');
      this.userUpdatedListener.next(true);
      this.openSnackBar('User profile updated succefully.', null);

    }, error => {
      console.log('user update failed');
      this.userUpdatedListener.next(false);
      this.openSnackBar('User profile update failed.', null);
    });
  }
  getUsers(){
    this.downloadUsers();
    return this.users;
  }
  getUsersByCentre(centreId: string) {
    // this.downloadUsers();
    // if ( this.users.length != 0 ) {
    //   return this.users.filter(user => user.centre == centreId);
    // }
    // return [];
    console.log('get tester: ' + centreId);
    this.http.post<{message: string, testers: any}>('http://localhost:3000/api/user/getTester', {testCentre: centreId}).subscribe( response => {
      console.log('tester retrieved');
      this.testerRetrievedListener.next(response.testers);
    }, error => {
      console.log('tester retrieval failed: ' + error.message);
      this.testerRetrievedListener.next([]);
    });
  }
  getTestOfficerByCentre(centreId: string) {
    this.downloadUsers();
    if ( this.users.length != 0 ) {
      return this.users.filter(user => user.centre == centreId && user.usertype == 'Tester');
    }
    return [];
  }
  deleteUser(id: string) {
    // this.downloadUsers();
    // this.users.splice(this.user
    // s.findIndex(user => user.id == id), 1);
    // this.uploadUsers();
    console.log('delete ran: ' + id);
    this.http.delete('http://localhost:3000/api/user/' + id ).subscribe( response => {
      // this.getUsersByCentre(this.getCurrentUser().id);
      this.userDeletedListener.next(true);
      this.openSnackBar('User deleted successfully.', null);
    }, error => {

    })
  }









  uploadUsers(){
    localStorage.setItem('user', JSON.stringify(this.users));
  }
  downloadUsers(){
    this.users = JSON.parse(localStorage.getItem('user'));
    if ( this.users == null ) {
      this.users = [];
    }
  }
  uploadCurrentUser(){
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
  downloadCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  clearCurrentUser(){
    localStorage.removeItem('currentUser');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration:  2000,
    });
  }


}
