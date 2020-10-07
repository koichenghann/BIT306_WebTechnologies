import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private users: User[] = [];
  private currentUser: User;

  checkUsernameIsUnique(username: string){
    if(this.users.find(user => user.username == username)){
      return false;
    }
    return true;
  }

  register(username: string, password: string, usertype: string, contact: string, address: string){
    if(this.users.find(user => user.username == username)){
      return false;
    }
    const id = "U"+(this.users.length + 1);
    const user: User = {id:id, username:username, password:password, usertype:usertype, contact:contact, address:address};
    this.users.push(user);
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

  getCurrentUser(){
    this.downloadCurrentUser();
    return this.currentUser;
  }
  setCurrentUser(user: User){
    this.currentUser = user;
  }
  logout(){
    this.currentUser = undefined;
    this.clearCurrentUser();
  }
  updateCurrentUser(username: string, password: string, usertype: string, contact: string, address: string){
    var id = this.getCurrentUser().id;
  }
  getUsers(){
    return this.users;
  }

  uploadUsers(){
    localStorage.setItem('user', JSON.stringify(this.users));
  }
  downloadUsers(){
    this.users = JSON.parse(localStorage.getItem('user'));
    console.log("downloaded users: ",this.users);
  }
  uploadCurrentUser(){
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
  downloadCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  clearCurrentUser(){
    localStorage.setItem('currentUser', null);
  }

}
