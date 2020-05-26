import { Injectable } from "../../node_modules/@angular/core";
import { CredenciasDTO } from "../models/credencias.dto";
import { HttpClient } from "../../node_modules/@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService{

constructor(public http:HttpClient){
}    

authenticate(creds: CredenciasDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/login`,
                    creds,
                    {
                        observe: 'response',// retorna o header
                        responseType: 'text' 

                    })

}

}