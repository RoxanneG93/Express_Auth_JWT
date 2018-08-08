import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// importing map function from operators
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// Declaring Auth token and User variables
  authToken: any;
  user: any;

  // Injecting Http to make http requests
  constructor(private http: Http) { }

  // Now you will make a REGISTER method to call to your Backend 
  registerUser(user){
    let headers = new Headers();
    // Setting the content type to json
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .pipe(map(res => res.json));
  }

    // Now you will make a LOGIN method to call to your Backend 
   loginUser(user){
      let headers = new Headers();
      // Setting the content type to json
      headers.append('Content-Type', 'application/json');
      // making the 'api' call to your backend server's defined route
      return this.http.post('http://localhost:3000/users/login', user, {headers: headers})
      .pipe(map(res => res.json));
    }
}
