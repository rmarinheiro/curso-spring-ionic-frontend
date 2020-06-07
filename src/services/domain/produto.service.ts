import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService{

    constructor(public http:HttpClient){

    }

    findById(produto_id:string){
        console.log("Metodo findById" + produto_id);
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produto/${produto_id}`);
    }

    findByCategoria(categoria_id : string){
    console.log(categoria_id);
    return this.http.get(`${API_CONFIG.baseUrl}/produto/?categorias=${categoria_id}`) 
    }

    getSmallImageFromBucket(id :string):Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url , {responseType : 'blob'});

    }

    getImageFromBucket(id :string):Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
        console.log(url);
        return this.http.get(url , {responseType : 'blob'});

    }

}