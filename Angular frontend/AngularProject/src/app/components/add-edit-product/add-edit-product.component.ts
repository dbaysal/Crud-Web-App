import { ShowProductComponent } from './../../deneme/show-product/show-product.component';
import { Component,Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import  swal from 'sweetalert';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
  providers:[ShowProductComponent]

})
export class AddEditInspectionComponent implements OnInit {

  ProductList$!: Observable<any[]>;
  CategoryList$!: Observable<any[]>;

  constructor(public service: ApiService, public showProduct: ShowProductComponent) { }



  @Input() product:any;
  id: number = 0;
  name:string='';
  categoryId!: number;
  stock!: number;
  price!: number;
  createdDate!:string;
 public visible:boolean=true;

  ngOnInit(): void {
    this.id = this.product.id;
    this.name = this.product.name;
    this.categoryId = this.product.categoryId;
    this.stock = this.product.stock;
    this.price = this.product.price;
    this.ProductList$ = this.service.getProductList().pipe(map((x:any)=>x.data));
    this.CategoryList$ = this.service.getCategoryList().pipe(map((x:any)=>x.data));
    this.createdDate = this.product.createdDate;
    this.visible = true;

  }


  //set
  addProduct(){
    var product ={
      name:this.name,
      stock:this.stock,
      price:this.price,
      categoryId:this.categoryId,
    }
    this.visible = false;

    this.service.addProduct(product).subscribe(res=> {

      this.showProduct.showAddSuccess();


      var closeModalBtn = document.getElementById('add-edit-modal-close');

      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');

      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      }, 4000);
    },
    (error)=> {
      var closeModalBtn = document.getElementById('add-edit-modal-close');

      if(closeModalBtn){
        closeModalBtn.click();
      }

    if(error.status == 401){
        swal(`${error.status}`, "You must login!", "error");
      }

    else if(error.status == 403)
      swal( `${error.status}`,"You don't have the authorization!","error");

    else{
        swal( `${error.status}`,`${error.message}`,"error");
      }
    })
  }

  updateProduct(){
    var product ={
      id:this.id,
      name:this.name,
      stock:this.stock,
      price:this.price,
      categoryId:this.categoryId,
      createdDate:this.createdDate
    }
    this.visible = false;


    var id:number = this.id;
    this.service.updateProduct(product).subscribe(res=> {
      this.showProduct.showUpdateSuccess();
      var closeModalBtn = document.getElementById('add-edit-modal-close');


      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');

      if(showUpdateSuccess){
        showUpdateSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showUpdateSuccess){
          showUpdateSuccess.style.display = "none";
        }
      }, 4000);

    },
    (error)=> {
      var closeModalBtn = document.getElementById('add-edit-modal-close');


      if(closeModalBtn){
        closeModalBtn.click();
      }
    if(error.status == 401)
      swal(`${error.status}`, "You must login!", "error");

    else if(error.status == 403)
      swal( `${error.status}`,"You don't have the authorization!","error");

    else{
        swal( `${error.status}`,`${error.message}`,"error");
      }
    })
  }

  close(){
    var closeModalBtn = document.getElementById('add-edit-modal-close');


      if(closeModalBtn){
        closeModalBtn.click();
      }
  }




}
