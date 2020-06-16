import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayamentPage } from './payament';

@NgModule({
  declarations: [
    PayamentPage,
  ],
  imports: [
    IonicPageModule.forChild(PayamentPage),
  ],
})
export class PayamentPageModule {}
