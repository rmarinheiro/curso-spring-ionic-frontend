import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';



@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickAddressPage');
    this.items = [
      {
        id:"1",
        logradouro:"Rua Quinze de Novembro",
        numero : "300",
        complemento: "Apto 201",
        bairro : "Santa Monica",
        cep : "48293822",
        cidade: {
          id : "1",
          nome : "Uberlândia",
          estado: {
            id: "1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id:"2",
        logradouro:"Rua São João",
        numero : "300",
        complemento: "Apto 201",
        bairro : "Morumbi",
        cep : "20270001",
        cidade: {
          id : "2",
          nome : "São Paulo",
          estado: {
            id: "2",
            nome: "São Paulo"
          }
        }
      }
    ]
  }

}
