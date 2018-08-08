import { Component, OnInit } from '@angular/core';
// Importing ValidateServices from services folder
import { ValidateService } from '../services/validate.service';
// Importing AuthServices from services folder
import { AuthService } from '../services/auth.service';
// Importing Router 
import { Router } from '@angular/router';
// Importing Flash-Messages dependancy HERE
import { FlashMessagesService } from 'angular2-flash-messages' ;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Declaring variable for our register form
  firstName: String;
  lastName: String;
  username: String;
  email: String;
  password: String;

  // Injecting the service in the constructor
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  // Method to save user to Database
  onRegisterSubmit(){
    // declaring variable to store values as 'user'
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password
    }
    // Validating Required Feilds
    if(!this.validateService.validateRegister(user)){
      // Using the flashService to  display validation and provided Bootstrap css class and timout of 3 seconds
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      console.log('Pleae fill in all feilds');
  
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      console.log('Pleae use a valid email');
  
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data){
        this.flashMessage.show('Your are now registered.', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    })
  }

}
