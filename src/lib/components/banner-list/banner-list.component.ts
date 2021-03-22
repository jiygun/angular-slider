import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerListComponent {

  constructor() { }
}
