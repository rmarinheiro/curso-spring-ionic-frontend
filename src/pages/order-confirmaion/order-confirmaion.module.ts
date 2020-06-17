import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderConfirmaionPage } from './order-confirmaion';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    OrderConfirmaionPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmaionPage),
  ],
  providers:[
    PedidoService
  ]
})
export class OrderConfirmaionPageModule {}
