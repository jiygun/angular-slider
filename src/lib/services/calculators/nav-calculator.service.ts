import { Injectable } from '@angular/core';
import { PropertyService, SlideDefaultVeriables } from '../property.service';

@Injectable({
  providedIn: 'root',
})
export class NavCalculator {

  constructor(private propertyService: PropertyService) { }

  setSlideLocation(locationIndex: number): void {
    if (!this.propertyService.properties.isLoop && Math.floor(this.propertyService.properties.slideLocation) == SlideDefaultVeriables.DEFAULT_SLIDE_LOCATION && locationIndex == -1) return;
    if (!this.propertyService.properties.isLoop && this.propertyService.properties.slideLocation <= -(this.propertyService.properties.slideListLength - this.propertyService.properties.shownSlide) * (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) && locationIndex == 1) return;
    if (this.propertyService.properties.slideLocation != SlideDefaultVeriables.DEFAULT_SLIDE_LOCATION && locationIndex != 1) this.propertyService.properties = { slideLocation: this.propertyService.properties.slideLocation - (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) * locationIndex }
    if (this.propertyService.properties.slideLocation != -(this.propertyService.properties.slideListLength - 1) * (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) && locationIndex != -1) this.propertyService.properties = { slideLocation: this.propertyService.properties.slideLocation - (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) * locationIndex }
  }
}
