import { Component } from '@angular/core';
import { AuthService } from '../../services/login/login.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    email : string = '';
    password : string = '';
    confirmPassword : string = '';

    constructor(private auth : AuthService) { }

    register() {

      if(this.email == '') {
        alert('Please enter email');
        return;
      }
  
      if(this.password == '') {
        alert('Please enter password');
        return;
      }
      if(this.password != this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      this.auth.register(this.email,this.password);
      
      this.email = '';
      this.password = '';
  
    }
}
