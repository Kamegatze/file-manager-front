import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./authentication.component";
import {InputFormComponent} from "./routing-component/input-form/input-form.component";
import {ChangePasswordComponent} from "./routing-component/change-password/change-password.component";
import {RegistrationComponent} from "./routing-component/registration/registration.component";
import {PageRequestChangePasswordComponent} from "@authentication/routing-component/page-request-change-password/page-request-change-password.component";

const routes: Routes = [
  {
    path:"",
    component: AuthenticationComponent,
    children: [
      {path:"input-form", component:InputFormComponent},
      {path:"", redirectTo:"input-form", pathMatch:"full"},
      {path:"change-password", component:ChangePasswordComponent},
      {path:"registration", component:RegistrationComponent},
      {path:"request-change-password", component:PageRequestChangePasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
