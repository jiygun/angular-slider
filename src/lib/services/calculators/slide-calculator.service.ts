import { ElementRef, Injectable } from '@angular/core';
import { PropertyService } from '../property.service';

@Injectable({
  providedIn: 'root',
})
// @dynamic
export class SlideCalculatorService {

  constructor(private propertyService: PropertyService) { }

  getCalculatedSlideLocation(moveLocation: number): number {
    if (Math.abs(moveLocation / this.propertyService.properties.slideWidth) > 0.5) {
      if (moveLocation / this.propertyService.properties.slideWidth < 0) {
        this.propertyService.properties = { slideLocation: this.propertyService.properties.slideLocation + (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) * Math.round(Math.abs(moveLocation / this.propertyService.properties.slideWidth)) }
      } else {
        this.propertyService.properties = { slideLocation: this.propertyService.properties.slideLocation - (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) * Math.round(Math.abs(moveLocation / this.propertyService.properties.slideWidth)) }
      }
    }
    if (this.propertyService.properties.slideLocation <= -(this.propertyService.properties.slideListLength - this.propertyService.properties.shownSlide) * (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin))
      this.propertyService.properties = { slideLocation: -(this.propertyService.properties.slideListLength - this.propertyService.properties.shownSlide) * (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) }
    if (this.propertyService.properties.slideLocation > 0)
      this.propertyService.properties = { slideLocation: 0 }
    return this.propertyService.properties.slideLocation;
  }

  checkSlideLocationIfIsLoop(callback: () => void): void {
    if (Math.floor(this.propertyService.properties.slideLocation) <= Math.floor(-(this.propertyService.properties.slideListLength - this.propertyService.properties.shownSlide) * (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin))) {
      this.propertyService.properties = { slideLocation: (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) * (this.propertyService.properties.shownSlide - this.propertyService.properties.clonedSlides) }
      callback();
    }
    if (this.propertyService.properties.slideLocation === 0) {
      this.propertyService.properties = { slideLocation: (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) * (this.propertyService.properties.clonedSlides - this.propertyService.properties.slideListLength) }
      callback();
    }
  }

  calculateContainerAndElementWidth(elementRef: ElementRef): { containerWidth: number, elementWidth: number } {
    const containerWidth = parseFloat(getComputedStyle(elementRef.nativeElement).width.slice(0, getComputedStyle(elementRef.nativeElement).width.length - 2));
    const elementWidth = (containerWidth + this.propertyService.properties.slideMargin) / this.propertyService.properties.shownSlide - this.propertyService.properties.slideMargin;
    return { elementWidth: elementWidth, containerWidth: containerWidth }
  }

  setNewLocationForResize(newWidth: number): void {
    this.propertyService.properties = { slideLocation: this.propertyService.properties.slideLocation + (this.propertyService.properties.slideWidth - newWidth) * (-this.propertyService.properties.slideLocation / (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin)) }
  }

  static calculateContainerWidth(elementRef: ElementRef): number {
    return parseFloat(getComputedStyle(elementRef.nativeElement).width.slice(0, getComputedStyle(elementRef.nativeElement).width.length - 2));
  }

  static calculateSlideElementWidth(containerWidth: number, slideItems: number, margin: number): number {
    return (containerWidth / slideItems) - (margin * (slideItems - 1)) / slideItems;
  }

}
