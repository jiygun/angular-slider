import { Injectable } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { OptionsListener } from '../change-listeners/options.listener.service';
import { SlideListener } from '../change-listeners/slide.listener.service';

interface TimerOptions {
  isLoop: boolean;
  timerCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private _timer!: Subscription;

  private _timerOptions: TimerOptions;

  constructor(private optionsService: OptionsListener, private slideListener: SlideListener) { }

  createTimer() {
    if (this._timerOptions && this._timerOptions.isLoop) {
      this._createTimer();
      return;
    }
    this.optionsService.getSlideOptions().pipe(take(1)).subscribe(slideOptions => {
      this._timerOptions = { isLoop: slideOptions.loop, timerCount: slideOptions.timer };
      this._createTimer();
    });
  }

  clearTimer(): void {
    if (this._timer) this._timer.unsubscribe();
  }

  private _createTimer(): void {
    this.clearTimer();
    this._timer = timer(this._timerOptions.timerCount, this._timerOptions.timerCount).subscribe(t => this.slideListener.setSlideChangeModel({ index: 1, slideChangeType: "Timer" }));
  }

}
