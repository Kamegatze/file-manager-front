import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authenticationGuard} from "@root/guards/authentication/authentication.guard";

const routes: Routes = [
  {
    path:"authentication",
    loadChildren: () => import("@authentication/authentication.module")
      .then((module) => module.AuthenticationModule)
  },
  {
    path: "",
    loadChildren: () => import("@file-manager/file-manager.module")
      .then((module) => module.FileManagerModule),
    canActivate: [authenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
