import { NotfoundComponent } from './notfound/notfound.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './login-page/login/login.component';

const routes: Routes = [


  {path: '', component:LoginComponent},

  {path: '', component: AppLayoutComponent,
   children:[
      {path: '', loadChildren:() => import('./deneme/deneme.module').then(m=>m.DenemeModule)},

   ]},

   { path: '**', pathMatch: 'full',
        component: NotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
