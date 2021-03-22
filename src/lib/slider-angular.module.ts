import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannerItemComponent } from './components/banner-item/banner-item.component';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { BannerComponent } from './components/banner/banner.component';
import { SlideNextComponent } from './components/slide-next/slide-next.component';
import { SlidePrevComponent } from './components/slide-prev/slide-prev.component';
import { SliderAngularComponent } from './components/slider-angular/slider-angular.component';
import { SliderItemComponent } from './components/slider-item/slider-item.component';
import { SliderComponent } from './components/slider/slider.component';
import { SliderListHorizontalComponent } from './components/sliderlist-horizontal/sliderlist-horizontal.component';
import { NgBannerDirective } from './components/banner-list/ng-banner.directive';
import { BannerActiveDirective } from './components/banner/banner-active.directive';

@NgModule({
  declarations: [
    BannerComponent,
    BannerListComponent,
    BannerItemComponent,
    SliderComponent,
    SliderAngularComponent,
    SliderItemComponent,
    SliderListHorizontalComponent,
    SlidePrevComponent,
    SlideNextComponent,
    NgBannerDirective,
    BannerActiveDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    SliderAngularComponent,
    SliderItemComponent,
    SliderListHorizontalComponent,
    SlidePrevComponent,
    SlideNextComponent,
  ],
})
export class SliderAngularModule { }
/*
  providers: [
    {
      provide: 'slideOptions', deps: [SlideOptionsChangeService],
      useFactory: (slideOptionsService: SlideOptionsChangeService) => slideOptionsService.getSlideOptions()
    }
  ]
*/
