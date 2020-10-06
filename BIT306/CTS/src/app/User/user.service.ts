import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private users: User[] = [];

  checkUsernameIsUnique(username: string){
    if (this.users.find(user => user.username == username)) {
      console.log('user not unique');
      return false;
    }
    return true;
  }

  register(username: string, password: string, usertype: string, contact: string, address: string){

    if(this.users.find(user => user.username == username)){
      console.log('user not unique');
      return false;
    }

    const id = "U"+(this.users.length + 1);
    const user: User = {id:id, username:username, password:password, usertype:usertype, contact:contact, address:address};
    this.users.push(user);
  }
  login(){

  }
  getCurrentUser(){

  }
  updateCurrentUser(){

  }
}
