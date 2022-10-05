import { ApiService } from './../../services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { VERSION ,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Table } from 'primeng/table';
import  swal from 'sweetalert';








@Component({
  selector: 'app-abc',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.scss']
})
export class CsvImport {


  constructor(private papa: Papa, private service:ApiService) {

  }


  jsonObj:string='';
  tableContentAsJSON: any;


  ConvertCSVtoJSON() {

    this.tableContentAsJSON = JSON.parse(JSON.stringify(this.test));
    console.log(JSON.stringify(this.test));

    console.log(this.tableContentAsJSON);

  }


  test = [];
  x=[];


  handleFileSelect(evt:any) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
       var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          for (let i = 0; i < results.data.length; i++) {

             let product = {
              name: results.data[i].name,
              stock:Number(results.data[i].stock),
              price: Number(results.data[i].price),
              categoryId: Number(results.data[i].categoryId)
            };
           this.test.push(product as never);
          }
          //console.log(this.test);

          this.ConvertCSVtoJSON();
        }

      });


    }

  }

  addToDatabase(){
    if(this.tableContentAsJSON == null){
      swal("Error","Please import an excel file","error")
    }
    else{
      for (let i = 0; i < this.tableContentAsJSON.length; i++) {

        let product = {
         name: this.tableContentAsJSON[i].name,
         stock:Number(this.tableContentAsJSON[i].stock),
         price: Number(this.tableContentAsJSON[i].price),
         categoryId: String(this.tableContentAsJSON[i].categoryId)
       };

       this.service.addProduct(product).subscribe();
       debugger;
      }

    }

  }



    ngOnInit() {
      this.tableContentAsJSON = null;

    }

}
