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

    removePrduto (produto : ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items.splice(position,1);
        }
        this.storage.setLocalCart(cart);
        return cart;

    }

    increaseQuantity (produto : ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade++;
        }
        this.storage.setLocalCart(cart);
        return cart;

    }

    decreaseQuantity (produto : ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade < 1){
                cart = this.removePrduto(produto);
            }
        }
        this.storage.setLocalCart(cart);
        return cart;

    }

    total(): number{
        let cart = this.getCart();
        let sum = 0;
        for(var i=0; i<cart.items.length ; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }

        return sum;
    }
}