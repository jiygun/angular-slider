import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'slider-angular',
  templateUrl: './slider-angular.component.html',
  styleUrls: ['./slider-angular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderAngularComponent {
  constructor() { }
}
