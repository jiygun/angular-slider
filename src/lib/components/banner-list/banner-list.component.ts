import { Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { SliderChangeService } from "../../services/slider-change.service";

@Component({
  selector: 'banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit,OnDestroy {

  private _bannerListHtmlElement:Array<HTMLElement>;

  private _bannerMouseOverEvents:any;

  constructor(private elementRef:ElementRef,private renderer:Renderer2,private sliderChangeService:SliderChangeService) { 
  }
  ngOnDestroy(): void {
    this._bannerMouseOverEvents=null;
  }
  ngOnInit(): void {
    this._bannerListHtmlElement=[...this.elementRef.nativeElement.children];
    this._bannerMouseOverEvents=this._bannerListHtmlElement.forEach(bannerElement => {
      this.renderer.listen(bannerElement,"mouseover",()=>{
        this.sliderChangeService.setActiveSlide((this._bannerListHtmlElement.indexOf(bannerElement)));
      });
    });
  }
}