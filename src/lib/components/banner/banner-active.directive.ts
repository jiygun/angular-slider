import { Directive, ElementRef } from '@angular/core';
import { BannerActiveListener } from '../../services/change-listeners/banner-active.listener.service';
import { SlideListener } from "../../services/change-listeners/slide.listener.service";

@Directive({
  selector: '[bannerActive]',
  host: { "(click)": "setSlideList($event)", "(mouseover)": "setSlideList($event)" }
})
export class BannerActiveDirective {

  //@ContentChildren("bannerItem", { read: BannerItemComponent }) bannerList: QueryList<BannerItemComponent>;

  constructor(private elementRef: ElementRef, private changeService: SlideListener, private bannerActiveListener: BannerActiveListener) {
    this.changeActiveBanner();
  }

  setSlideList(event: Event): void {
    if ([...this.elementRef.nativeElement.children].includes(event.target)) {
      this.clearActiveBanner();
      (event.target as HTMLElement).classList.add("active");
      this.changeService.setSlideChangeModel({ index: [...this.elementRef.nativeElement.children].indexOf(event.target), slideChangeType: "Banner" });
    }
  }

  private changeActiveBanner(): void {
    this.bannerActiveListener.activeBanner.subscribe(active=>{
      if(this.elementRef.nativeElement.children.length){
        this.clearActiveBanner();
        (this.elementRef.nativeElement.children[active] as HTMLElement).classList.add("active");
      }
    });
  }

  private clearActiveBanner():void{
    [...this.elementRef.nativeElement.children].forEach(e => e.classList.remove("active"));
  }


}
