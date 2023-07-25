import { RegisterComponent } from './component/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardService } from '../app/auth/auth-guard.service';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
