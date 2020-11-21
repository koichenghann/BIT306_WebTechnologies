import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { Subject } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token: string;
  private authStatusListener = new Subject<boolean>();
  private loginResponseListener = new Subject<any>();
  private usernameValidatedListener = new Subject<any>();

  constructor(private http: HttpClient, private router:Router) { }

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

  register(username: string, password: string, usertype: string, contact: string, address: string, centre: string) {
    // const user: User = {username: email, password: password};
    const user: User = {id: null, username:username, password:password, usertype:usertype, contact:contact, address:address, centre:centre};
    this.http.post('http://localhost:3000/api/user/signup', user)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
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





  // register(username: string, password: string, usertype: string, contact: string, address: string, centre: string){
  //   this.downloadUsers();
  //   if(this.users.find(user => user.username == username)){
  //     return false;
  //   }
  //   const id = this.generateID();
  //   const user: User = {id:id, username:username, password:password, usertype:usertype, contact:contact, address:address, centre:centre};
  //   this.users.push(user);
  //   this.uploadUsers();
  // }

  // login(username: string, password: string){
  //   this.downloadUsers();
  //   var currentUser = this.users.find(user => user.username == username && user.password == password);
  //   if(currentUser!=undefined){
  //     this.setCurrentUser(currentUser);
  //     this.uploadCurrentUser();
  //     return true;
  //   }
  //   return false;
  // }

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
  // logout(){
  //   this.currentUser = undefined;
  //   this.clearCurrentUser();
  // }
  updateCurrentUser(username: string, password: string, usertype: string, contact: string, address: string, centre: string){
    var id = this.getCurrentUser().id;
  }
  updateUser(id: string, username: string, password: string, usertype: string, contact: string, address: string, centre: string) {
    console.log('user id: ', id);
    //this.downloadUsers();
    var user = this.users.find(user => user.id == id);
    user.username = username;
    user.password = password;
    user.contact = contact;
    user.address = address;
    user.centre = centre;
    this.uploadUsers();
  }
  getUsers(){
    this.downloadUsers();
    return this.users;
  }
  getUsersByCentre(centreId: string) {
    this.downloadUsers();
    if ( this.users.length != 0 ) {
      return this.users.filter(user => user.centre == centreId);
    }
    return [];
  }
  getTestOfficerByCentre(centreId: string) {
    this.downloadUsers();
    if ( this.users.length != 0 ) {
      return this.users.filter(user => user.centre == centreId && user.usertype == 'Tester');
    }
    return [];
  }
  deleteUser(id: string) {
    this.downloadUsers();
    this.users.splice(this.users.findIndex(user => user.id == id), 1);
    this.uploadUsers();
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


}
