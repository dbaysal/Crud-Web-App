
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(public service: ApiService, private router:Router) { }

  username:string='';
  password:string='';
  token1$!:Observable<any>;
  myToken:any;
  errorMessage:string='';
  isUserValid:boolean=false;
  errorStatus:string='';


  ngOnInit(): void {

  }



  Login(){
    var user ={
      username:this.username,
      password:this.password
    }


    this.service.loginUser(user).subscribe((res) => {
      this.myToken = res?res:[];

      this.isUserValid = true;
      this.service.setUserValidation(true);


      // swal("Welcome", "Login Successful!", "success");

      this.errorMessage = '';
      window.localStorage.setItem("token",this.myToken.data.token);

      this.router.navigate(["product"]);


    }, (err) => {

      this.errorMessage = err.error.errors[0];
      this.errorStatus = err.status;
      this.isUserValid = false;
      this.service.setUserValidation(false);

      localStorage.clear();
      //swal( `${this.errorStatus}`,`${this.errorMessage}`,"error");
    });

  }

}


