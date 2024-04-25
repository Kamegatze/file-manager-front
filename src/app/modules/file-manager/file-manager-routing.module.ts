import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileManagerComponent} from "@file-manager/file-manager.component";
import {MainComponent} from "@file-manager/routing-component/main/main.component";

const routes: Routes = [
  {
    path: "",
    component: FileManagerComponent,
    children: [
      {
        path: "**",
        component: MainComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { }
