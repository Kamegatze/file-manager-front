import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { InputFormComponent } from './routing-component/input-form/input-form.component';
import { AuthenticationComponent } from './authentication.component';
import { ChangePasswordComponent } from './routing-component/change-password/change-password.component';
import { RegistrationComponent } from './routing-component/registration/registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputModuleComponent} from "@root/components/input-module/input-module.component";
import {PageRequestChangePasswordComponent} from "./routing-component/page-request-change-password/page-request-change-password.component";
import {ModalComponent} from "@root/components/modal/modal.component";


@NgModule({
    declarations: [
        InputFormComponent,
        AuthenticationComponent,
        ChangePasswordComponent,
        RegistrationComponent,
        InputModuleComponent,
        PageRequestChangePasswordComponent,
        ModalComponent
    ],
    exports: [
        InputModuleComponent
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthenticationModule { }
