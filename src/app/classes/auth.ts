import {EventEmitter} from '@angular/core';
import {User} from '../interfaces/user';

export class Auth {
  static userEmitter = new EventEmitter<User>();
  public static user: User;
}
