import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { SlideListener } from '../../services/change-listeners/slide.listener.service';

@Component({
  selector: 'slide-prev',
  templateUrl: './slide-prev.component.html',
  styleUrls: ['./slide-prev.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidePrevComponent {

  constructor(private slideListener: SlideListener) { }

  @HostListener("click", ["$event"])
  setActiveSlide() {
    this.slideListener.setSlideChangeModel({ index: -1, slideChangeType: "Nav" });
  }
}
