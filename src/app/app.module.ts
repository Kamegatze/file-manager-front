import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthenticationInterceptor} from "@root/interceptor/authentication.interceptor";
import {LocalStorage} from "@utilities/local-storage/local-storage";
import {LocalStorageImp} from "@utilities/local-storage/imp/local-storage-imp";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor , multi: true },
    { provide: LocalStorage, useClass: LocalStorageImp}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
