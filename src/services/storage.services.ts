import { Injectable } from "../../node_modules/@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys_config";


@Injectable()
export class StorageService{
    getLocalUser():LocalUser{
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if(user == null){
            return null;
        }else{
            return JSON.parse(user)
        }
    }

    setLocalUser(obj:LocalUser){
        if(obj == null){
            console.log("Entrou aqui" + obj);
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{
            localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(obj));
        }

    }
}