
import { map, Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import swal from 'sweetalert';
import { AddEditInspectionComponent } from 'src/app/components/add-edit-product/add-edit-product.component';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import * as moment from 'moment';







@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss'],
  providers: [MessageService]
})

export class ShowProductComponent implements OnInit {
  ProductList$!:Observable<any[]>;
  CategoryList$!:Observable<any[]>;

  CategoryNames:any=[];
  productDataSource:any;

  CategoryMap:Map<number,string> = new Map();

  count:number=0;
  ProductAny!:any;
  deneme:boolean=false;
  msgs1!: Message[];

  constructor(public service:ApiService,  private primengConfig: PrimeNGConfig,  public messageService: MessageService) { }


  ngOnInit(): void {


    //Getting Product List from database
    this.refreshLists();

    //Getting Category List from database
    this.CategoryList$ = this.service.getCategoryList().pipe(map((x:any)=>x.data));

    //map categoryId to category name
    this.refreshCategoryMap();

    this.service.getProductCount().subscribe(x=>{
      this.count=x;
    });


    this.msgs1 = [{severity:'success', summary:'Success', detail:'Product Added Succesfully'}];

    this.primengConfig.ripple = true;

  }

  //Variables
  modalTitle:string='';
  activateAddEditProductComponent:boolean = false;
  product:any;
  category:any;
  user:any;


  modalAdd(){
    this.product ={
      id:0,
      name:null,
      stock:null,
      price:null,
      createdDate:null,
      categoryId:null
    }
    this.modalTitle = "Add Product";
    this.deneme = true;
    this.activateAddEditProductComponent = true;

  }




  //refresh product table after adding or updating data
  modalClose(){
    this.activateAddEditProductComponent = false;
    this.refreshLists();
    this.deneme = false;
  }

  modalEdit(item:any){
    this.product = item;
    this.modalTitle = "Edit Product";
    this.activateAddEditProductComponent = true;

  }

  item1:any;
  item2:any;

  delete(item:any){

    console.log(JSON.stringify(item));
    swal({
      title: `Are you sure you want to delete ${item.name} with Id: ${item.id}?`,
      text: "Once deleted, you will not be able to recover!",
      buttons:["Cancel","Ok"],
      icon: "warning",

      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        this.service.deleteProduct(item.id).subscribe(res=>{
          this.showDeleteSuccess();
          var closeModalBtn = document.getElementById('delete-edit-modal-close');

        if(closeModalBtn){
          closeModalBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');

        if(showDeleteSuccess){
          showDeleteSuccess.style.display = "block";
        }

        setTimeout(function(){
          if(showDeleteSuccess){
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);

        this.refreshLists();

        },

        (error)=> {
          if(error.status == 401)
          swal(`${error.status}`, "You must login!", "error");

        else if(error.status == 403)
          swal( `${error.status}`,"You don't have the authorization!","error");
        }

        )
        // swal("Product deleted successfully", {
        //   icon: "success",
        // }
        //);
      }
      else {
        swal("Your file is safe!");
      }
    });
  }

  //Displaying Category Name instead of Category Id by mapping
  refreshCategoryMap(){
    this.service.getCategoryList().pipe(map((x:any)=>x.data)).subscribe(data =>{
      this.CategoryNames = data;
      for(let i=0 ; i<data.length; i++){
        this.CategoryMap.set(this.CategoryNames[i].id, this.CategoryNames[i].name);
      }
    })
  }


showAddSuccess() {
    this.messageService.add({severity:'success', summary:'Product successfully added to database'});
}

showUpdateSuccess(){
  this.messageService.add({severity:'success', summary:'Product successfully updated'});
}

showDeleteSuccess(){
  this.messageService.add({severity:'success', summary:'Product successfully deleted'});
}



refreshLists() {
  this.ProductList$ = this.service.getProductList().pipe(map((x:any)=>x.data));

        this.service.getProductList().pipe(map((x:any)=>x.data)).subscribe(res=> {
          for(let i=0 ; i<res.length; i++){
            res[i].createdDate =  (moment(res.createdDate)).format('MM-DD-YYYY HH:mm:ss');
            res[i].updatedDate =  (moment(res.createdDate)).format('MM-DD-YYYY HH:mm:ss');
          }

          this.ProductAny = JSON.parse(JSON.stringify(res));
        });

        this.service.getProductCount().subscribe(x=>{
          this.count=x;
        })
}

}



