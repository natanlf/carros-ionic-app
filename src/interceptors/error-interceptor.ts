import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private storage: StorageService, 
        public alertCtrl: AlertController){}

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
               case 401:
               this.handle401();
               break;

               case 403: 
               this.handle403();
               break;

               case 422:
                this.handle422(errorObj);
                break;

               default: 
                this.handleDefaultError(errorObj);
           }

            return Observable.throw(errorObj);
       }) as any;
   }

   handle401(){ 
    //criando um objeto alert
        let alert = this.alertCtrl.create({
        title: "Erro 401: falha na autenticação",
        message: "Email ou senha incorretos",
        enableBackdropDismiss: false, //para sair do alert deve clicar no botão do mesmo
        buttons:[
            {
                text: "OK"
            }
        ]

    });
    alert.present(); //apresenta o alert
}

    handle403(){ //se der erro 403 vou limpar o token e email do LocalStorage
        this.storage.setLocalUser(null);
    }

    handle422(errorObj){
        let alert = this.alertCtrl.create({
            title: "Erro 422: Validação",
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false, //para sair do alert deve clicar no botão do mesmo
            buttons:[
                {
                    text: "OK"
                }
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj){
        //criando um objeto alert
        let alert = this.alertCtrl.create({
           title: "Erro :"+errorObj.status+": " +errorObj.error,
           message: errorObj.message,
           enableBackdropDismiss: false, //para sair do alert deve clicar no botão do mesmo
           buttons:[
               {
                   text: "OK"
               }
           ]

       });
       alert.present(); //apresenta o alert
   }

   private listErrors(messages : FieldMessage[]) : string {
    let s : string = '';
    for (var i=0; i<messages.length; i++) {
        s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
}
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}; 