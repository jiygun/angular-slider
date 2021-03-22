import { ElementRef, Injectable } from '@angular/core';
import { SlideOptions } from '../models/slide.options';
import { BannerActiveListener } from "./change-listeners/banner-active.listener.service";

export enum SlideDefaultVeriables {
  DEFAULT_SHOWN_SLIDE = 0,
  DEFAULT_SLIDE_LOCATION = 0,
  DEFAULT_SLIDE_MARGIN = 0,
  DEFAULT_SHOWABLE_SLIDE = 1,
  DEFAULT_CLONED_SLIDE = 0
}

export interface CalculatorProperties {
  slideLocation?: number,
  slideListLength?: number,
  slideWidth?: number,
  slideMargin?: number,
  clonedSlides?: number,
  shownSlide?: number,
  isLoop?: boolean,
  duration?: number,
  banner?: boolean
}

@Injectable({
  providedIn: 'root',
})
export class PropertyService {

  private _properties: CalculatorProperties = {
    slideLocation: 0,
    slideListLength: 0,
    slideWidth: 0,
    slideMargin: 0,
    clonedSlides: 0,
    shownSlide: 0,
    isLoop: false,
    duration: 0,
    banner: false
  };

  constructor(private activeBannerService: BannerActiveListener) { }

  setPropertiesWithSlideOptions(slideOptions: SlideOptions, elementRef: ElementRef): void {
    const slideWidth = parseFloat(getComputedStyle([...elementRef.nativeElement.children][0]).width.slice(0, getComputedStyle([...elementRef.nativeElement.children][0]).width.length - 2));
    this._properties = {
      slideLocation: -(slideWidth + slideOptions.margin) * (slideOptions.loop ? slideOptions.items : SlideDefaultVeriables.DEFAULT_SHOWN_SLIDE),
      slideListLength: elementRef.nativeElement.children.length,
      slideMargin: slideOptions.margin ? slideOptions.margin : SlideDefaultVeriables.DEFAULT_SLIDE_MARGIN,
      shownSlide: slideOptions.responsive ? slideOptions.responsive.find(r => r.breakPoint < window.innerWidth).items : slideOptions.items,
      clonedSlides: slideOptions.loop ? slideOptions.items * 2 : SlideDefaultVeriables.DEFAULT_CLONED_SLIDE,
      slideWidth: slideWidth,
      isLoop: slideOptions.loop,
      duration: slideOptions.duration,
      banner: slideOptions.banner
    };
  }

  get properties(): CalculatorProperties {
    return this._properties;
  }

  set properties(calculatorProperties: CalculatorProperties) {
    this._properties = { ...this._properties, ...calculatorProperties };
    this.getActiveBanner();
  }

  //temp
  private getActiveBanner() {
    if(-this._properties.clonedSlides/2*(this._properties.slideWidth+this._properties.slideMargin)<this._properties.slideLocation){
      this.activeBannerService.setActiveBanner(Math.round((this._properties.slideListLength - this._properties.clonedSlides) / this._properties.shownSlide)-1);
      return;
    }
    if(-(this._properties.slideWidth+this._properties.slideMargin)*(this._properties.slideListLength-this._properties.clonedSlides/2)>=this._properties.slideLocation){
      this.activeBannerService.setActiveBanner(0);
      return;
    }
    this.activeBannerService.setActiveBanner(Math.floor(-((this._properties.clonedSlides/2)*(this._properties.slideWidth+this._properties.slideMargin)+this._properties.slideLocation)/((this._properties.slideWidth+this._properties.slideMargin)*this._properties.shownSlide)));
  }
}
