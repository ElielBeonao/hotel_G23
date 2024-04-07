import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { 
  constructor(dpConfig: NgbDatepickerConfig) {
    
    dpConfig.minDate = { year: 1900, month: 1, day: 1 };
  }
}
