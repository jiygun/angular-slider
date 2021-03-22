import { ElementRef, Injectable, Injector } from '@angular/core';
import { take } from 'rxjs/operators';
import { SlideOptions } from '../../models/slide.options';
import { SlideBuilderService } from '../builders/slide.builder.service';
import { ChangeBuilder } from '../builders/change.builder.service';
import { WidthBuilder } from '../builders/width.builder.service';
import { BannerCalculator } from '../calculators/banner-calculator.service';
import { SlideCalculatorService } from '../calculators/slide-calculator.service';
import { BannerListener } from '../change-listeners/banner.listener.service';
import { OptionsListener } from '../change-listeners/options.listener.service';
import { CalculatorProperties, PropertyService } from '../property.service';
import { TimerService } from './timer.service';

type Events = Event | MouseEvent | TouchEvent;

interface SlideEvents {
  slideDown(event: Events): void;
  slideMove(event: Events): void;
  slideUp(event: Events): void;
  slideResize(event: Events): void;
}

@Injectable({
  providedIn: 'root',
})
export class SlideEventService implements SlideEvents {

  private slideOptions: SlideOptions;

  private _isSlideDown: boolean = false;
  private _isSlideMove: boolean = false;

  private _clickedLocation: number = 0;

  constructor(private injector: Injector, private optionsService: OptionsListener,
    private propertyService: PropertyService, private widthBuilder: WidthBuilder,
    private slideCalculator: SlideCalculatorService, private bannerService: BannerListener,
    private elementRef: ElementRef, private timerService: TimerService, private bannerCalculator: BannerCalculator, private changeBuilder: ChangeBuilder) {
    optionsService.getSlideOptions().pipe(take(2)).subscribe((slideOptions: SlideOptions) => {
      if (slideOptions) {
        this.slideOptions = slideOptions;
        injector.get(SlideBuilderService);
        propertyService.setPropertiesWithSlideOptions(slideOptions, elementRef);
        widthBuilder.setSlideListLocation(propertyService.properties.slideLocation);
        if (this.slideOptions.banner) this.bannerService.setBannerLimit(this.bannerCalculator.getBannerListLength());
        timerService.createTimer();
      }
    });
  }

  slideDown(event: Events): void {
    event.preventDefault();
    this._isSlideDown = true;
    this.timerService.clearTimer();
    if (this.slideOptions.loop) this.slideCalculator.checkSlideLocationIfIsLoop(() => this.widthBuilder.setSlideListLocation(0));
    this._clickedLocation = this.getClientX(event) | 0;
  }

  slideMove(event: Events): void {
    event.stopPropagation();
    if (this._isSlideDown) {
      this.timerService.clearTimer();
      this.widthBuilder.moveSlideLocation(this.propertyService.properties.slideLocation - this._clickedLocation + this.getClientX(), 0);
      this._isSlideMove = true;
    }
  }

  slideUp(event: Events): void {
    if (this._isSlideDown) this.timerService.createTimer();
    if (this._isSlideDown && !this._isSlideMove) event.currentTarget.removeEventListener('click', this.clearEvents, true);
    if (this._isSlideDown && this._isSlideMove) {
      this._isSlideDown = false;
      this._isSlideMove = false;
      this.slideCalculator.getCalculatedSlideLocation(this._clickedLocation - this.getClientX());
      this.widthBuilder.setSlideListLocation(this.propertyService.properties.duration);
      event.currentTarget.addEventListener('click', this.clearEvents, true);
    }
  }

  slideResize(event: Events): void {
    this.timerService.clearTimer();
    const { containerWidth, elementWidth } = this.slideCalculator.calculateContainerAndElementWidth(this.elementRef);
    if (this.slideOptions.responsive && this.slideOptions.responsive.length && this.propertyService.properties.shownSlide !== this.slideOptions.responsive.find(r => r.breakPoint < window.innerWidth).items) {
      const newShownSlide = this.slideOptions.responsive.find(r => r.breakPoint < window.innerWidth).items;
      const newSlideElementWidth = SlideCalculatorService.calculateSlideElementWidth(containerWidth, newShownSlide, this.slideOptions.margin);
      this.setSliderPropertiesForResize(newSlideElementWidth, { slideWidth: newSlideElementWidth, shownSlide: newShownSlide });
      if (this.slideOptions.banner) this.bannerService.setBannerLimit(this.bannerCalculator.getBannerListLength());
    } else if (elementWidth !== this.propertyService.properties.slideWidth) this.setSliderPropertiesForResize(elementWidth, { slideWidth: elementWidth });
    this.timerService.createTimer();
  }

  private setSliderPropertiesForResize(elementWidth: number, slideProperties: CalculatorProperties): void {
    this.slideCalculator.setNewLocationForResize(elementWidth);
    this.propertyService.properties = slideProperties;
    this.widthBuilder.setSlidesWidth();
    this.widthBuilder.setSlideListLocation(0);
  }

  private clearEvents(event: Events): void {
    event.preventDefault();
  }

  private getClientX(event: Event = window.event): number {
    return ((event as MouseEvent).clientX || ((event as TouchEvent).touches ? (event as TouchEvent).touches[0].clientX : 0 || (event as TouchEvent).changedTouches ? (event as TouchEvent).changedTouches[0].clientX : 0)) || 0;
  }

}
