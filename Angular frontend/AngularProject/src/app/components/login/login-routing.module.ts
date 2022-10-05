import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent2 } from './login.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent2 }
    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
