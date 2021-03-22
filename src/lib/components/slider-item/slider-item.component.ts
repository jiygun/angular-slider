import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderItemComponent {
  constructor() { }
}
