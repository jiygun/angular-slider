import { Injectable } from '@angular/core';
import { PropertyService } from '../property.service';

@Injectable({
  providedIn: 'root',
})
// @dynamic
export class BannerCalculator {

  constructor(private propertyService: PropertyService) { }

  setSlideLocation(locationIndex: number): void {
    this.propertyService.properties={slideLocation:-(this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) * ((this.propertyService.properties.shownSlide * locationIndex + this.propertyService.properties.clonedSlides / 2))}
  }

  getBannerListLength(): number {
    return Math.round((this.propertyService.properties.slideListLength - this.propertyService.properties.clonedSlides) / this.propertyService.properties.shownSlide);
  }

}
