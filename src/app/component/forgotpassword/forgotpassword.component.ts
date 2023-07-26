import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
email: string = '';

  constructor(private auth: AuthService) { }

  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email = '';
    
  }



}
