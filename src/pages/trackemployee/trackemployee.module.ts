import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackemployeePage } from './trackemployee';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    TrackemployeePage,
  ],
  imports: [
    IonicPageModule.forChild(TrackemployeePage),
    IonicSelectableModule
  ],
})
export class TrackemployeePageModule {}
