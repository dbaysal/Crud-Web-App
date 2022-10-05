
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { StoreModule } from '@ngrx/store';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login-page/login/login.component';
import { PasswordModule } from "primeng/password";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from 'auth-guard';
import { TokenInterceptorService } from './services/token-service/token-interceptor.service';
import { NotfoundComponent } from './notfound/notfound.component';











@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
  ],
  imports: [
    PasswordModule,
    CheckboxModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    AppRoutingModule,
    TableModule,
    AppLayoutModule,
    StoreModule.forRoot({}, {}),
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
