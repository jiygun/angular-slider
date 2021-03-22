import { ElementRef, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BannerListener } from '../change-listeners/banner.listener.service';
import { OptionsListener } from '../change-listeners/options.listener.service';
import { SlideOptions } from '../../models/slide.options';
import { SlideCalculatorService } from '../calculators/slide-calculator.service';

@Injectable({
  providedIn: 'root',
})
export class SlideBuilderService implements OnDestroy {

  private _slideOptionsListener: Subscription;

  constructor(private slideOptions: OptionsListener,
    private elementRef: ElementRef, private renderer: Renderer2, private bannerService: BannerListener) {
    this.initSlideList();
  }

  ngOnDestroy(): void {
    if (this._slideOptionsListener) this._slideOptionsListener.unsubscribe();
  }

  private initSlideList(): void {
    this._slideOptionsListener = this.slideOptions.getSlideOptions().pipe(take(2)).subscribe((slideOptions: SlideOptions) => {
      if (slideOptions) {
        if (slideOptions.banner) this.bannerService.setBannerLimit(Math.round(this.elementRef.nativeElement.children.length/(slideOptions.responsive?slideOptions.responsive.find(r => r.breakPoint < window.innerWidth).items:slideOptions.items)));
        if (slideOptions.loop) this.createSlideListWithClones(slideOptions);
        let itemWidth: number = this.getSlideElementWith(slideOptions);
        [...this.elementRef.nativeElement.children].forEach((element: HTMLElement) => {
          element.setAttribute("style", `width: ${itemWidth}px !important; margin-right: ${slideOptions.margin}px !important;`);
        });
      }
    });
  }

  private getSlideElementWith(slideOptions: SlideOptions): number {
    const slideContainerWidth: number = SlideCalculatorService.calculateContainerWidth(this.elementRef);
    let slideElementWidth: number = 0;
    if (slideOptions.responsive && slideOptions.responsive.find(r => r.breakPoint < window.innerWidth).items) {
      slideElementWidth = SlideCalculatorService.calculateSlideElementWidth(slideContainerWidth, slideOptions.responsive.find(r => r.breakPoint < window.innerWidth).items, slideOptions.margin);
    } else {
      slideElementWidth = SlideCalculatorService.calculateSlideElementWidth(slideContainerWidth, slideOptions.items, slideOptions.margin);
    }
    return slideElementWidth;
  }

  private createSlideListWithClones(slideOptions: SlideOptions): void {
    const slideListCloned: HTMLElement[] = [...[...this.elementRef.nativeElement.children].slice([...this.elementRef.nativeElement.children].length - slideOptions.items, [...this.elementRef.nativeElement.children].length), ...[...this.elementRef.nativeElement.children], ...[...this.elementRef.nativeElement.children].slice(0, slideOptions.items)];
    let newSlideListHtml: string = "";
    slideListCloned.forEach((item: HTMLElement) => newSlideListHtml += item.outerHTML);
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', newSlideListHtml);
  }

}
