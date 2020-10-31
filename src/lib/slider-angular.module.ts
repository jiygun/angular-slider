import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { BannerItemComponent } from './components/banner-item/banner-item.component';
import { BannerImageComponent } from './components/banner-image/banner-image.component';
import { SliderComponent } from './components/slider/slider.component';
import { SliderAngularComponent } from './components/slider-angular/slider-angular.component';
import { SliderItemComponent } from './components/slider-item/slider-item.component';
import { SliderListHorizontalComponent } from './components/sliderlist-horizontal/sliderlist-horizontal.component';
import { SliderListVerticalComponent } from './components/sliderlist-vertical/sliderlist-vertical.component';
import { SliderLinkComponent } from './components/slider-link/slider-link.component';
import { SliderImageComponent } from './components/slider-image/slider-image.component';

@NgModule({
  declarations: [
    BannerComponent,
    BannerListComponent,
    BannerItemComponent,
    BannerImageComponent,
    SliderComponent,
    SliderAngularComponent,
    SliderItemComponent,
    SliderListHorizontalComponent,
    SliderListVerticalComponent,
    SliderLinkComponent,
    SliderImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BannerComponent,
    BannerListComponent,
    BannerItemComponent,
    BannerImageComponent,
    SliderComponent,
    SliderAngularComponent,
    SliderItemComponent,
    SliderListHorizontalComponent,
    //SliderListVerticalComponent,
    SliderLinkComponent,
    SliderImageComponent
  ]
})
export class SliderAngularModule { }
