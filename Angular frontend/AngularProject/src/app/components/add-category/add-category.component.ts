import { ShowCategoryComponent } from './../../deneme/show-category/show-category.component';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import  swal from 'sweetalert';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  providers: [ShowCategoryComponent]
})
export class AddCategoryComponent implements OnInit {

  CategoryList$!: Observable<any[]>;

  constructor(public service: ApiService, private showCategory: ShowCategoryComponent) { }

  public visible:boolean=true;


  @Input() category:any;
  name:string='';


  ngOnInit(): void {
    this.name = this.category.name;
    this.visible = true;
  }

  addCategory(){
    var category ={
      name:this.name,
    }
    this.visible = false;

    this.service.addCategory(category).subscribe(res=> {
      this.showCategory.showAddSuccess();
      var closeModalBtn = document.getElementById('add-category-modal-close');

      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-category-success-alert');

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
      var closeModalBtn = document.getElementById("add-category-modal-close");

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

    }


    )

  }


  close(){
    var closeModalBtn = document.getElementById("add-category-modal-close");


      if(closeModalBtn){
        closeModalBtn.click();
      }
  }
}
