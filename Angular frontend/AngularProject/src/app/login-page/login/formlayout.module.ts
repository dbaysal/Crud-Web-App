import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormLayoutRoutingModule } from './login-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';



@NgModule({
    imports: [
      HttpClientModule,
      RippleModule,
      InputSwitchModule,
      RadioButtonModule,
      BadgeModule,
      SidebarModule,
      BrowserAnimationsModule,
      InputTextModule,
      BrowserModule,
      CommonModule,
      FormsModule,
      ChartModule,
      MenuModule,
      TableModule,
      StyleClassModule,
      PanelMenuModule,
      ButtonModule,
      FormLayoutRoutingModule
    ],
    declarations: [LoginComponent],
    bootstrap: [LoginComponent]
})
export class FormlayoutModule { }
