import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { API_CONFIG } from '../config/api.config';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
     constructor(public storage: StorageService) {
    }
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;
        //se a quantidade de caracteres da requisiçao for igual a da baseurl
        //significa que é uma chamada para o nosso web service e colocamos o header
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

        //se existe o token no local storage e for requisição para meu web service, incluo o token na requisição
        if(localUser && requestToAPI){ 
            //estou clonando a requisição original e colocando o Header com o token
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq); //retorno a requisição clonada
        } else{ //se não tiver logado, faço a requisição normal sem cabeçalho
            return next.handle(req);
        }

    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};