import { Injectable } from "../../node_modules/@angular/core";
import { CredenciasDTO } from "../models/credencias.dto";
import { HttpClient } from "../../node_modules/@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.services";
import{ JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthService{
    jwtHelper : JwtHelper = new JwtHelper();

constructor(public http:HttpClient,public storage:StorageService){
}    

authenticate(creds: CredenciasDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/login`,
                    creds,
                    {
                        observe: 'response',// retorna o header
                        responseType: 'text' 

                    })

}
sucessfulLogin(authorizationValue: string){
    let tok = authorizationValue.substring(7);
    let user : LocalUser={
        token : tok,
        email : this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
}

logout(){
    this.storage.setLocalUser(null);
}

refreshToken(){
    return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,
                    {},
                    {
                        observe: 'response',// retorna o header
                        responseType: 'text' 

                    })

}

}