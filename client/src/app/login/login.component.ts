import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// Declaring variables
  email: String;
  password: String;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  // Login Method
  onLoginSubmit(){
// declaring user variable to store user input
    const user = {
      email: this.email,
      password: this.password
    }
    // running function of loginUser from the auth service
    this.AuthService.loginUser(user).subscribe(data => {
      if(data){
        
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-dager', timeout: 5000});
        this.router.navigate(['/login']);
      }
    })
  }


}
