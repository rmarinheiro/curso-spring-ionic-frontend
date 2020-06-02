import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder:FormBuilder) {

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
       estadoId : ['São Paulo',[Validators.required]],
       cidadeId : ['Osasco',[Validators.required]] 







     })           
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(){
    console.log("passou aqui");
  }



}
