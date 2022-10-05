import { Component, OnInit } from '@angular/core';
import { ResolveStart } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss'],
  providers: [MessageService]
})
export class ShowCategoryComponent implements OnInit {

  ProductList$!:Observable<any[]>;
  CategoryList$!:Observable<any[]>;

  CategoryNames:any=[];
  productDataSource:any;

  CategoryMap:Map<number,string> = new Map();


  constructor(public service:ApiService, public messageService: MessageService) { }


  ngOnInit(): void {

    //Getting Category List from database
    this.CategoryList$ = this.service.getCategoryList().pipe(map((x:any)=>x.data));

    this.service.getCategoryList().pipe(map((x:any)=>x.data))
    .subscribe(res=> {
      this.categoryAny = res;});

  }

  //Variables
  modalTitle:string='';
  activateAddCategoryComponent: boolean = false;
  product:any;
  category:any;
  user:any;
  categoryAny:any;


  modalCategoryAdd(){
    this.category ={
      name:null,
    }
    this.modalTitle = "Add Category";
    this.activateAddCategoryComponent = true;
  }

  modalCategoryClose(){
    this.activateAddCategoryComponent = false;
    this.CategoryList$ = this.service.getCategoryList().pipe(map((x:any)=>x.data));

    this.service.getCategoryList().pipe(map((x:any)=>x.data))
    .subscribe(res=> {
      this.categoryAny = res;});

  }

  showAddSuccess() {
    this.messageService.add({severity:'success', summary:'Category successfully added to database'});
}

}
