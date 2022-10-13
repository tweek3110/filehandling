import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public getCurrentUser() {
    return this.http.get(`${baseurl}/current-user`);
  }

  //generate toekn
  public generateToken(loginData: any) {
    return this.http.post(`${baseurl}/generate-token`, loginData);
  }

  //login user: set token in localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }
  //user is login or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //logout :remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  //get token
  public getToken() {
    return localStorage.getItem('token');
  }
  //set user details to local storage
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  //get user
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }
  //get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorites;
  }
}
