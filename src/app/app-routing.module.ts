import { RegisterComponent } from './component/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardService } from '../app/auth/auth-guard.service';
import { EmailVerificationComponent } from './component/verification/email-verification.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DialogfollowerComponent } from './component/dialogfollower/dialogfollower.component';
import { DialogfollowingComponent } from './component/dialogfollowing/dialogfollowing.component';

const routes: Routes = [

  {
    path: 'homepage',
    component : HomepageComponent,
    canActivate: [AuthGuardService]
    },

  {
    path:'',
    component : LoginComponent,
  },
  {
    path:'register',
    component : RegisterComponent,
  },
  {
    path:'verify-email',
    component: EmailVerificationComponent
  },
  {
    path:'forgot-password',
    component: ForgotpasswordComponent
  },
  {
  path:'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuardService]

  },

{
  path:'profile/:userId',
  component: ProfileComponent,
  canActivate : [AuthGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuardService, DashboardComponent,DialogfollowerComponent,DialogfollowingComponent ]
})
export class AppRoutingModule { }
