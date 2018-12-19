import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       console.log("Passou no interceptor");
       return next.handle(req)
       .catch((error, caught) => {
            let errorObj = error;
           if (errorObj.error) { //pegando o erro personalizado do nosso Web service
               errorObj = errorObj.error;
           }
           if (!errorObj.status) { //se o erro não tiver status, não é json, nesse caso do um parse para json
               errorObj = JSON.parse(errorObj);
           }
            console.log("Erro detectado pelo interceptor:"); //interceptor retorna o erro na tela agora e não mais o controlador
           console.log(errorObj);

           switch(errorObj.status){
               case 403: 
               this.handle403();
               break;
           }

            return Observable.throw(errorObj);
       }) as any;
   }

    handle403(){ //se der erro 403 vou limpar o token e email do LocalStorage
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}; 