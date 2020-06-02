import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estados.services';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados : EstadoDTO[];
  cidades : CidadeDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder:FormBuilder,
            public cidadeService:CidadeService,
          public estadoService:EstadoService) {

     this.formGroup = this.formBuilder.group({
       nome :['Rafael',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
       email: ['rafael@gmail.com' , [Validators.required,Validators.email]],
       tipo :['1',[Validators.required]],
       cpfOuCnpj :['31093361700',[Validators.required ,Validators.minLength(11),Validators.maxLength(14)]],
       senha : ['123',[Validators.required]],
       logradouro : ['Rua das Flores',[Validators.required]],
       numero : ['334',[Validators.required]],
       complemento :['',[]],
       bairro :['',[]],
       cep : ['',[Validators.required]],
       telefone1: ['22345678',[Validators.required]],
       telefone2: ['',[]],
       telefone3 :['',[]],
       estadoId : ['null',[Validators.required]],
       cidadeId : ['null',[Validators.required]] 

     })           
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
    .subscribe(response =>{
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
    },
  error =>{});

  }

  updateCidades(){
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId)
    .subscribe(response =>{
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
  error=>{});
  }

  signupUser(){
    console.log("passou aqui");
  }



}
