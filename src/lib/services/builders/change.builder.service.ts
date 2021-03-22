import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { SlideChangeTypes } from '../../models/slide.model';
import { BannerCalculator } from '../calculators/banner-calculator.service';
import { NavCalculator } from '../calculators/nav-calculator.service';
import { SlideCalculatorService } from '../calculators/slide-calculator.service';
import { TimerCalculator } from '../calculators/timer-calculator.service';
import { SlideChangeModel, SlideListener } from '../change-listeners/slide.listener.service';
import { TimerService } from '../events/timer.service';
import { PropertyService } from '../property.service';
import { WidthBuilder } from './width.builder.service';

enum SlideChangeType {
  Timer = "timerCalculator",
  Nav = "navCalculator",
  Banner = "bannerCalculator"
}

@Injectable({
  providedIn: 'root'
})
export class ChangeBuilder {

  constructor(private changeService: SlideListener, private timerService: TimerService,
    private propertyService: PropertyService, private slideCalculator: SlideCalculatorService,
    private bannerCalculator: BannerCalculator, private navCalculator: NavCalculator,
    private timerCalculator: TimerCalculator, private widthBuilder: WidthBuilder) {
    this.slideChangeListener();
  }

  setSlideLocationForChanges(locationIndex: number, changeType: SlideChangeTypes): void {
    Object.keys(SlideChangeType).find(key => {
      if (key === changeType) {
        if (this.propertyService.properties.isLoop) this.slideCalculator.checkSlideLocationIfIsLoop(() => this.widthBuilder.setSlideListLocation(0));
        this[SlideChangeType[key]].setSlideLocation(locationIndex);
        timer(10).subscribe(t => this.widthBuilder.setSlideListLocation(this.propertyService.properties.duration));
        return true;
      }
    });
  }

  private slideChangeListener(): void {
    this.changeService.slideChangeModel.subscribe((slideChangeModel: SlideChangeModel) => {
      if (slideChangeModel) {
        this.timerService.clearTimer();
        this.setSlideLocationForChanges(slideChangeModel.index, slideChangeModel.slideChangeType);
        this.timerService.createTimer();
      }
    });
  }
}
