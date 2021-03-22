import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BannerListener } from '../../services/change-listeners/banner.listener.service';

@Directive({
  selector: '[ngBanner]'
})
export class NgBannerDirective implements OnInit {

  constructor(private bannerListener:BannerListener,private container:ViewContainerRef,private template:TemplateRef<any>) { }

  ngOnInit(): void {
    this.bannerListener.slideBannerLimit.subscribe(limit=>{
      this.container.clear();
      for (const input of new Array(limit)) {
        this.container.createEmbeddedView(this.template);
      }
    });
  }

}
