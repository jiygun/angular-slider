import { Component, ElementRef, OnDestroy, OnInit, Renderer2, AfterViewInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { SliderChangeService } from "../../services/slider-change.service";

@Component({
  selector: 'banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnDestroy,AfterViewChecked {

  private _bannerListHtmlElement:Array<HTMLElement>;

  private _bannerMouseOverEvents:any;

  constructor(private elementRef:ElementRef,private renderer:Renderer2,private sliderChangeService:SliderChangeService) {
  }
  ngAfterViewChecked(): void {
    if([...this.elementRef.nativeElement.children].length>0&&!this._bannerListHtmlElement){
      this._bannerListHtmlElement=[...this.elementRef.nativeElement.children];
      this._bannerMouseOverEvents=this._bannerListHtmlElement.forEach(bannerElement => {
        this.renderer.listen(bannerElement,"mouseover",this.setActiveSlide.bind(this,bannerElement));
        this.renderer.listen(bannerElement,"click",this.setActiveSlide.bind(this,bannerElement));
      });
    }
  }
  ngOnDestroy(): void {
    this._bannerMouseOverEvents=null;
  }
  private setActiveSlide(bannerElement:HTMLElement){
    this.sliderChangeService.setActiveSlide((this._bannerListHtmlElement.indexOf(bannerElement)+1));
  }
}
