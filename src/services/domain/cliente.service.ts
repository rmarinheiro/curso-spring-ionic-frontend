import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/RX";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.services";

@Injectable()
export class ClienteService{

    constructor(public http:HttpClient, public storage: StorageService,){
    }

   
        
        findByEmail(email:string){
           
            console.log("Email do Usuário : " + email);

            return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
        }

        getImageFromBucket(id:String):Observable<any>{
            let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
            console.log(url);
            return this.http.get(url,{responseType:"blob"});
        }

        insert(obj : ClienteDTO) {
            return this.http.post(
                `${API_CONFIG.baseUrl}/clientes`, 
                obj,
                { 
                    observe: 'response', 
                    responseType: 'text'
                }
            ); 
        }
    }
    
