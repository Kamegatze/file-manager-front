import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors
} from "@angular/common/http";
import { LocalStorage } from "@utilities/local-storage/local-storage";
import { LocalStorageImp } from "@utilities/local-storage/imp/local-storage-imp";
import { DecoderJwt } from "@utilities/decoder-jwt/decoder-jwt";
import { DecoderJwtImp } from "@utilities/decoder-jwt/imp/decoder-jwt-imp";
import {authInterceptor} from "@root/interceptors/auth-interceptor.interceptor";

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
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideClientHydration(),
    { provide: LocalStorage, useClass: LocalStorageImp},
    { provide: DecoderJwt, useClass: DecoderJwtImp},
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
