import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./authentication.component";
import {InputFormComponent} from "./routing-component/input-form/input-form.component";
import {ChangePasswordComponent} from "./routing-component/change-password/change-password.component";
import {RegitrationComponent} from "./routing-component/regitration/regitration.component";

const routes: Routes = [
  {
    path:"",
    component: AuthenticationComponent,
    children: [
      {path:"input-form", component:InputFormComponent},
      {path:"", redirectTo:"input-form", pathMatch:"full"},
      {path:"change-password", component:ChangePasswordComponent},
      {path:"registration", component:RegitrationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
