import { AddEditInspectionComponent } from '../components/add-edit-product/add-edit-product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CsvImport } from './csv-import/csv-import.component';
import { DashboardRoutingModule } from './deneme-routing.module';
import { TestpageComponent } from './testpage/testpage.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoryComponent } from '../components/add-category/add-category.component';
import { ShowCategoryComponent } from './show-category/show-category.component';
import {DialogModule} from 'primeng/dialog';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import {TreeModule} from 'primeng/tree';
import {AccordionModule} from 'primeng/accordion';
import { DividerModule } from "primeng/divider";
import { DatePipe } from '@angular/common';










@NgModule({
  declarations: [
    ShowCategoryComponent,
    DashboardComponent,
    CsvImport,
    TestpageComponent,
    ShowProductComponent,
    AddEditInspectionComponent,
    AddCategoryComponent,
    UsermanagementComponent,


  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CheckboxModule,
    FormsModule,
    FileUploadModule,
    ToolbarModule,
    TableModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    TreeModule,
    AccordionModule,
    DividerModule,
    DatePipe

  ],
})
export class DenemeModule { }
