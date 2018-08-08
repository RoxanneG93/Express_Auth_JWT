import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
// Validating user to make sure feilds are not blank/undefined
  validateRegister(user){
    if((user.firstName && user.lastName && user.password) === undefined){
      return false;
    } else {
      return true;
    }
  }
  // Validating user email using ReGex expression, will return TRUE or FALSE
  validateEmail(email){
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }
}
