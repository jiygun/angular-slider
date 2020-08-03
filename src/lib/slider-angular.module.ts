import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SliderAngularComponent } from './slider-angular.component';



@NgModule({
  declarations: [SliderAngularComponent],
  imports: [
    CommonModule
  ],
  exports: [SliderAngularComponent]
})
export class SliderAngularModule { }
