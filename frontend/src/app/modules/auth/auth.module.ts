import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
    imports: [AuthRoutingModule, LoginComponent, RegisterComponent],
    exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
