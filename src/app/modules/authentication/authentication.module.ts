import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { InputFormComponent } from './routing-component/input-form/input-form.component';
import { AuthenticationComponent } from './authentication.component';
import { ChangePasswordComponent } from './routing-component/change-password/change-password.component';
import { InputModuleComponent } from '@root/components/input-module/input-module.component';
import { RegistrationComponent } from './routing-component/registration/registration.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InputFormComponent,
    AuthenticationComponent,
    ChangePasswordComponent,
    InputModuleComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
