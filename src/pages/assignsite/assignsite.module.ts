import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignsitePage } from './assignsite';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AssignsitePage,
  ],
  imports: [
    IonicPageModule.forChild(AssignsitePage),
    IonicSelectableModule
  ],
})
export class AssignsitePageModule {}
