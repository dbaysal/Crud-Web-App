import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly inspectionAPIUrl = "https://localhost:7240/api";

  x:string|null = localStorage.getItem("token");

  jwt:any;
  jwtData:any;
  decodedJwtJsonData:any;
  decodedJwtData:any;
  RolesList!:any[];
  private productListSize$ = new Subject<number>();
  no:number =0;





  isUserValid:boolean=false;

  constructor(private http: HttpClient) {



    if(this.x==null){
      this.isUserValid=false;
    }

    else{
      this.isUserValid=true;
    }
   }

   getProductCount()
   {
      return this.productListSize$.asObservable();
   }

  //Product
  getProductList():Observable<any[]>{

    var obs=this.http.get<any>(this.inspectionAPIUrl + '/Products');
    obs.pipe(map((x:any)=>x.data))
    .subscribe(x=>{
      this.productListSize$.next(x.length);
    })
    return obs;
  }

  addProduct(data:any){
    debugger;
    var x= this.http.post(this.inspectionAPIUrl + '/Products', data);
    return x;
  }

  updateProduct(data:any){
    return this.http.put(this.inspectionAPIUrl + '/Products', data);
  }

  deleteProduct(id:number|string){
    return this.http.delete(this.inspectionAPIUrl + `/Products/${id}`);
  }

  //Category
  getCategoryList(): Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl + '/Categories');
  }

  addCategory(data:any){
    return this.http.post(this.inspectionAPIUrl + '/Categories', data);
  }

  getUserList(){
    return this.http.get<any>(this.inspectionAPIUrl + '/User');
  }

  getRolesList(){
    return this.http.get<any>(this.inspectionAPIUrl + '/Role');
  }

  getUserRoles(id:any){
    return this.http.get<any>(this.inspectionAPIUrl + `/User/GetUserRoles/${id}`);
  }

  addRole(data1:any, data2:any){
    return this.http.get(this.inspectionAPIUrl +`/User/AddRole/${data1}/${data2}`);
  }

  removeRole(data1:any, data2:any){
    return this.http.get(this.inspectionAPIUrl +`/User/RemoveRole/${data1}/${data2}`);
  }

  loginUser(data:any){
    return this.http.post(this.inspectionAPIUrl + '/Login', data);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setUserValidation(data:boolean){
    this.isUserValid = data;
  }

  getUserValidation(){
    return this.isUserValid;
  }



  Includes(x:string){
    this.jwt = localStorage.getItem("token")?.toString();
    this.jwtData = this.jwt.split('.')[1];
    this.decodedJwtJsonData = window.atob(this.jwtData);
    this.decodedJwtData = JSON.parse(this.decodedJwtJsonData);
    this.RolesList= this.decodedJwtData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return this.RolesList.includes(x);

  }




}

