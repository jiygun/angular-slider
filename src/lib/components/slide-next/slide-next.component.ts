import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { SlideListener } from '../../services/change-listeners/slide.listener.service';

@Component({
  selector: 'slide-next',
  templateUrl: './slide-next.component.html',
  styleUrls: ['./slide-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideNextComponent {

  constructor(private slideListener: SlideListener) { }

  @HostListener("click", ["$event"])
  setActiveSlide() {
    this.slideListener.setSlideChangeModel({ index: 1, slideChangeType: "Nav" });
  }
}
