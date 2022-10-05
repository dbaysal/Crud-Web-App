import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { ShowCategoryComponent } from './show-category/show-category.component';
import { AppConfig } from './../layout/service/app.layout.service';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CsvImport } from './csv-import/csv-import.component';
import { TestpageComponent } from './testpage/testpage.component';
import { LoginComponent } from '../login-page/login/login.component';
import { ShowProductComponent } from './show-product/show-product.component';





@NgModule({
  imports: [ RouterModule.forChild([
    {path:'dashboard', component:DashboardComponent},
    {path:'csvimport', component:CsvImport},
    {path:'testpage', component:TestpageComponent},
    {path:'product', component:ShowProductComponent},
    {path:'category', component:ShowCategoryComponent},
    {path:'usermanagement', component:UsermanagementComponent},
  ])

  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
