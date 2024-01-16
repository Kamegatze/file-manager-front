import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthenticationInterceptor} from "@root/interceptor/authentication.interceptor";
import {InputModuleComponent} from "@root/components/input-module/input-module.component";

@NgModule({
  declarations: [
    AppComponent,
    InputModuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
