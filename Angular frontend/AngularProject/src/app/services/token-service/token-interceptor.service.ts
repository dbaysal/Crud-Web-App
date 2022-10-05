import { ApiService } from '../api-service/api.service';
import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authService = this.injector.get(ApiService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
