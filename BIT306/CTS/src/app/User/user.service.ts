import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private users: User[] = [];
  private currentUser: User;
  private selectedTester: User;


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





  register(username: string, password: string, usertype: string, contact: string, address: string, centre: string){
    this.downloadUsers();
    if(this.users.find(user => user.username == username)){
      return false;
    }
    const id = this.generateID();
    const user: User = {id:id, username:username, password:password, usertype:usertype, contact:contact, address:address, centre:centre};
    this.users.push(user);
    // console.log(this.users);
    this.uploadUsers();
  }
  login(username: string, password: string){
    this.downloadUsers();
    var currentUser = this.users.find(user => user.username == username && user.password == password);
    if(currentUser!=undefined){
      this.setCurrentUser(currentUser);
      this.uploadCurrentUser();
      return true;
    }
    return false;
  }
  checkUsernameIsUnique(username: string){
    this.downloadUsers();
    if(this.users.find(user => user.username == username)){
      return false;
    }
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
    this.downloadCurrentUser();
    this.currentUser = user;
  }
  logout(){
    this.currentUser = undefined;
    this.clearCurrentUser();
  }
  updateCurrentUser(username: string, password: string, usertype: string, contact: string, address: string, centre: string){
    var id = this.getCurrentUser().id;
  }
  updateUser(id: string, username: string, password: string, usertype: string, contact: string, address: string, centre: string) {
    console.log('update user in servive ran');
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
