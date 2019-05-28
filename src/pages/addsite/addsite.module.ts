import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddsitePage } from './addsite';

@NgModule({
  declarations: [
    AddsitePage,
  ],
  imports: [
    IonicPageModule.forChild(AddsitePage),
  ],
})
export class AddsitePageModule {}
