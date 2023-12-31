import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/login/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email : string = '';
  password : string = '';
  

  constructor(private auth : AuthService) {}

  ngOnInit() {

  }

  login() {
  this.auth.login(this.email,this.password);
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
 
  }

