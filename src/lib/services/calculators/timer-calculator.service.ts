import { Injectable } from '@angular/core';
import { PropertyService } from '../property.service';

@Injectable({
  providedIn: 'root',
})
export class TimerCalculator {

  constructor(private propertyService: PropertyService) { }

  setSlideLocation(locationIndex: number): void {
    if (this.propertyService.properties.isLoop) this.propertyService.properties = { slideLocation: this.propertyService.properties.slideLocation - (this.propertyService.properties.slideWidth + this.propertyService.properties.slideMargin) * locationIndex }
  }

}
