import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmaion',
  templateUrl: 'order-confirmaion.html',
})
export class OrderConfirmaionPage {

  pedido : PedidoDTO;
  cartItems : CartItem[];
  cliente : ClienteDTO;
  endereco : EnderecoDTO

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cartService:CartService,
            public clienteService:ClienteService) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
    .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco =  this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']) 
    },
  error=>{
    this.navCtrl.setRoot('HomePage');
  })

  }

  private findEndereco(id:String,list : EnderecoDTO[]) : EnderecoDTO{
    let position = list.findIndex(x=>x.id == id);
    return list[position]
  }

  total(){
    return this.cartService.total();
  }

}
