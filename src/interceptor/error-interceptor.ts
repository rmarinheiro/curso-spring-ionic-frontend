import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { StorageService } from '../services/storage.services';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService, public alertController : AlertController){

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no interceptor");
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            //console.log(errorObj);

            switch(errorObj.status){
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                default:
                this.handleDefault(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
        let alert = this.alertController.create({
            title: 'Erro 403 falha na autenticação',
            message: 'Email ou senha incorretas',
            enableBackdropDismiss:true,
            buttons:[
                {
                    text: 'OK'
                }
            ]
            
        });
       alert.present();
        
    }

    handle401(){
        let alert = this.alertController.create({
            title: 'Erro 401 falha na autenticação',
            message: 'Email ou senha incorretas',
            enableBackdropDismiss:false,
            buttons:[
                {
                    text: 'OK'
                }
            ]
            
        });
        alert.present();

    }
    handleDefault(errorObj){

    let alert = this.alertController.create({
        title: 'Erro' + errorObj.status + ':' + errorObj.error,
        message: errorObj.message,
        enableBackdropDismiss:false,
        buttons:[
            {
                text: 'OK'
            }
        ]
        
    });
    alert.present();



    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};