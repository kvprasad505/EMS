import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SitestatusPage } from './sitestatus';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  declarations: [
    SitestatusPage,
  ],
  imports: [
    IonicPageModule.forChild(SitestatusPage),
    IonicSelectableModule
  ],
})
export class SitestatusPageModule {}
