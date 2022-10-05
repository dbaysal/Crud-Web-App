import { ApiService } from './../../services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import  swal from 'sweetalert';
import { map, Observable } from 'rxjs';
import { MessageService, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss'],
  providers:[MessageService]
})
export class UsermanagementComponent implements OnInit {

  constructor(public service: ApiService, public messageService: MessageService) { }

  RoleList$!:Observable<any[]>;
  UserList$!:Observable<any[]>;
  RoleNames:any=[];
  productDataSource:any;
  RoleMap:Map<number,string> = new Map();
  role:any;
  id: number = 0;
  userAny:any;

  root!: TreeNode[];

  roles: TreeNode = {};






  ngOnInit(): void {



    this.UserList$ = this.service.getUserList().pipe(map((x:any)=>x.data));

    this.RoleList$ = this.service.getRolesList().pipe(map((x:any)=>x.data));

    this.service.getUserList().pipe(map((x:any)=>x.data)).subscribe(res=> {
      this.userAny = res;
    });

    this.refreshRoleMap();

  }

  //Variables
  modalTitle:string='';
  activateAddRoleComponent:boolean = false;
  activateDeleteRoleComponent:boolean = false;
  product:any;
  category:any;
  user:any;
  roleId:any;
  roleIds:Array<number>=[];





  //refresh product table after adding or updating data
  modalClose(){
    this.activateAddRoleComponent = false;
    this.activateDeleteRoleComponent = false;
    this.UserList$ = this.service.getUserList().pipe(map((x:any)=>x.data));
    this.RoleList$ = this.service.getRolesList().pipe(map((x:any)=>x.data));

     this.service.getUserList().pipe(map((x:any)=>x.data)).subscribe(res=> {
      this.userAny = res;
    });
  }

  modalEditAdd(item:any){
    this.activateAddRoleComponent = true;
    this.id = item.id;
    this.roleIds = item.roleIds;

    this.service.getUserList().pipe(map((x:any)=>x.data)).subscribe(res=> {
      this.userAny = res;
    });


  }

  modalEditDelete(item:any){
    this.activateDeleteRoleComponent = true;
    this.id = item.id;
    this.roleIds = item.roleIds;

    this.service.getUserList().pipe(map((x:any)=>x.data)).subscribe(res=> {
      this.userAny = res;
    });


  }

  //Displaying Role Name instead of Category Id by mapping

  refreshRoleMap(){
    this.service.getRolesList().pipe(map((x:any)=>x.data)).subscribe(data =>{
      this.RoleNames = data;
      for(let i=0 ; i<data.length; i++){
        this.RoleMap.set(this.RoleNames[i].id, this.RoleNames[i].name);
      }
    })
  }

  addRole(){
    var user ={
      id:this.id,
    }



    var id:number = this.id;

    this.service.addRole(id, Number(this.roleId)).subscribe(
      res=>{
        var closeModalBtn = document.getElementById('add-role-edit-modal-close');

      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-role-success-alert');

      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      }, 4000);
      this.UserList$ = this.service.getUserList().pipe(map((x:any)=>x.data));
      this.RoleList$ = this.service.getRolesList().pipe(map((x:any)=>x.data));

      this.service.getUserList().pipe(map((x:any)=>x.data)).subscribe(res=> {
        this.userAny = res;
      });

      this.messageService.add({severity:'success', summary:'Role successfully added'});

      },

      (error)=> {

        if(error.status == 400){
          swal(`Error`, `Please select a role to add`, "error");
        }

        else{
          swal(`${error.status}`, `${error.message}`, "error");
        }


      }

      );

      this.activateAddRoleComponent=false;
  }

  removeRole(){

    var user ={
      id:this.id,
    }
    var id:number = this.id;

    this.service.removeRole(id, Number(this.roleId)).subscribe(
      res=>{
        var closeModalBtn = document.getElementById('remove-role-edit-modal-close');

      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('remove-role-success-alert');

      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      }, 4000);
      this.UserList$ = this.service.getUserList().pipe(map((x:any)=>x.data));
      this.RoleList$ = this.service.getRolesList().pipe(map((x:any)=>x.data));

      this.service.getUserList().pipe(map((x:any)=>x.data)).subscribe(res=> {
        this.userAny = res;
      });

      this.messageService.add({severity:'success', summary:'Role successfully removed'});

      },

      (error)=> {

        if(error.status == 400){
          swal(`Error`, `Please select a role to remove`, "error");
        }

        else{
          swal(`${error.status}`, `${error.message}`, "error");
        }
      }

      );
    this.UserList$ = this.service.getUserList().pipe(map((x:any)=>x.data));
    this.RoleList$ = this.service.getRolesList().pipe(map((x:any)=>x.data));

    this.service.getUserList().pipe(map((x:any)=>x.data)).subscribe(res=> {
      this.userAny = res;
    });

    this.activateDeleteRoleComponent=false;
  }





}





