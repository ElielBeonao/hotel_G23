import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { AuthServerProvider } from '../core/auth/auth-jwt.service';
import { LoginService } from '../core/services/login.service';
import { AccountService } from '../core/auth/account.service';
// import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { StateStorageService } from '../core/auth/state-storage.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  // providers: [AuthServerProvider, LoginService, AccountService, StateStorageService, LocalStorageService, SessionStorageService]
})
export class AuthModule { }
