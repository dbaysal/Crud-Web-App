
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { PrimeNGConfig } from 'primeng/api';
import swal from 'sweetalert';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(public service: ApiService, private router:Router, private primengConfig: PrimeNGConfig) { }

  username:string='';
  password:string='';
  token1$!:Observable<any>;
  myToken:any;
  errorMessage:string='';
  isUserValid:boolean=false;
  errorStatus:string='';


  ngOnInit(): void {

    this.primengConfig.ripple = true;
    localStorage.clear();
  }



  Login(){
    var user ={
      username:this.username,
      password:this.password
    }


    this.service.loginUser(user).subscribe((res) => {
      this.router.navigate(['/dashboard']);

      this.myToken = res?res:[];

      this.isUserValid = true;
      debugger;
      this.service.setUserValidation(true);




      // swal("Welcome", "Login Successful!", "success");

      this.errorMessage = '';
      window.localStorage.setItem("token",this.myToken.data.token);




    }, (err) => {

      this.errorMessage = err.error.errors[0];
      this.errorStatus = err.status;
      this.isUserValid = false;
      this.service.setUserValidation(false);
      localStorage.clear();
      swal( `${this.errorStatus}`,`${this.errorMessage}`,"error");
    });

  }

}


