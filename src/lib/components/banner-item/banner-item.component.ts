import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'banner-item',
  templateUrl: './banner-item.component.html',
  styleUrls: ['./banner-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerItemComponent {
  constructor() { }
}
