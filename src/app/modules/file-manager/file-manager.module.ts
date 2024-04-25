import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { MainComponent } from './routing-component/main/main.component';
import { FileManagerComponent } from './file-manager.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';
import {NgbCollapse, NgbDropdown, NgbDropdownButtonItem, NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap";
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { CreateFolderComponent } from './components/create-folder/create-folder.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';


@NgModule({
  declarations: [
    MainComponent,
    FileManagerComponent,
    NavBarComponent,
    FooterComponent,
    BreadcrumbComponent,
    ContextMenuComponent,
    CreateFolderComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    FileManagerRoutingModule,
    ReactiveFormsModule,
    NgbCollapse,
    NgOptimizedImage,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownButtonItem,
    FormsModule
  ]
})
export class FileManagerModule { }
