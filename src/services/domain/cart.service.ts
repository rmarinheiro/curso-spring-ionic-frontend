import { StorageService } from "../storage.services";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { Injectable } from "../../../node_modules/@angular/core";

@Injectable()
export class CartService{
    constructor(public storage : StorageService){

    }

    createOrClearCart():Cart{
        let cart : Cart ={items:[]};
        this.storage.setLocalCart(cart);
        return cart;
    }

    getCart():Cart{
        let cart : Cart = this.storage.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }
 
    addProduto (produto : ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.items.push({quantidade:1 , produto:produto});
        }
        this.storage.setLocalCart(cart);
        return cart;

    }
}