import { ElementRef, Injectable } from '@angular/core';
import { PropertyService } from '../property.service';

@Injectable({
  providedIn: 'root'
})
export class WidthBuilder {

  constructor(private elementRef: ElementRef, private propertyService: PropertyService) { }

  setSlidesWidth(): void {
    [...this.elementRef.nativeElement.children].forEach(e => e.setAttribute("style", `width: ${this.propertyService.properties.slideWidth}px !important; margin-right: ${this.propertyService.properties.slideMargin}px !important;`));
  }

  moveSlideLocation(slideLocation:number,duration:number){
    (<HTMLElement>this.elementRef.nativeElement).setAttribute('style', `transform: translate3d(${slideLocation}px,0px, 0px);transition: transform ${duration}ms ease-out 0s;`);
  }

  setSlideListLocation(duration:number):void{
    (<HTMLElement>this.elementRef.nativeElement).setAttribute('style', `transform: translate3d(${this.propertyService.properties.slideLocation}px,0px, 0px);transition: transform ${duration}ms ease-out 0s;`);
  }
}
