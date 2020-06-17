import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
            public produtoService : ProdutoService,
          public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
      this.loadData();
  }

  loadData(){
    let categoria_id = this.navParams.get("cat");
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response =>{
      this.items = response['content'];
      loader.dismiss();
      this.loadImageUrls();
    },
  error=>{
    loader.dismiss();
  });
  }

  loadImageUrls(){
    for(var i=0;i<this.items.length;i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response =>{
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        console.log(item.imageUrl);
      },
    error=>{});
    }
  }

  showDetail(produto_id : string){
    console.log(produto_id);
    this.navCtrl.push('ProdutoDetailPage' , {prod :produto_id});
  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
        refresher.complete();
    }, 1000);
  }


}
