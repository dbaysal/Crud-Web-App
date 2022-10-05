import { ApiService } from './../services/api-service/api.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    logout: any[] = [];
    userManagement: any[] = [];

    constructor(public layoutService: LayoutService, public service: ApiService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Operations',
                items: [

                    { label: 'Products', icon: 'pi pi-apple', routerLink: ['/product'] },
                    { label: 'Categories', icon: 'pi pi-list', routerLink: ['/category'] },
                    { label: 'Upload Csv', icon: 'pi pi-file-excel', routerLink: ['/csvimport'] },


                ]
            },]

            this.userManagement = [
              {
                label: 'User Operations',
                items:[
                  { label: 'User Management', icon: 'pi pi-lock', routerLink: ['/usermanagement'] },

                ]
              }
            ]

            this.logout = [
              {
                label: '',
              items:[
                { label: 'Logout', icon: 'pi pi-fw pi-mobile', routerLink: [''], class: 'rotated-icon'},
              ]
              }
            ]




          }


}
