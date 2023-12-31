import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { EmailVerificationComponent } from './component/verification/email-verification.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DialogComponent } from './component/dashboard/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProfileComponent } from './component/profile/profile.component';
import { DialogfollowerComponent } from './component/dialogfollower/dialogfollower.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogfollowingComponent } from './component/dialogfollowing/dialogfollowing.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    ForgotpasswordComponent,
    DialogComponent,
    ProfileComponent,
    DialogfollowerComponent,
    DashboardComponent,
    DialogfollowingComponent,
    
    
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
  ],

  providers: [ { provide:MAT_DIALOG_DATA, useValue: {} }, { provide:MatDialogRef, useValue:{}} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
