import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { MainComponent } from './routing-component/main/main.component';
import { FileManagerComponent } from './file-manager.component';


@NgModule({
  declarations: [
    MainComponent,
    FileManagerComponent
  ],
  imports: [
    CommonModule,
    FileManagerRoutingModule
  ]
})
export class FileManagerModule { }
