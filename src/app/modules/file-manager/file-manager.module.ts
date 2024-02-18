import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { MainComponent } from './routing-component/main/main.component';
import { FileManagerComponent } from './file-manager.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    MainComponent,
    FileManagerComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FileManagerRoutingModule,
    ReactiveFormsModule,
    NgbCollapse
  ]
})
export class FileManagerModule { }
