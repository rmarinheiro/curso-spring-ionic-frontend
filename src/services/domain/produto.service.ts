import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProdutoService{

    constructor(public http:HttpClient){

    }

    findByCategoria(categoria_id : string){
    console.log(categoria_id);
    return this.http.get(`${API_CONFIG.baseUrl}/produto/?categorias=${categoria_id}`) 
    }

}