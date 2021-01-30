import { Component, ElementRef, OnDestroy, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { SlideChangeService } from "../../services/slide-change.service";

@Component({
  selector: 'banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnDestroy,OnInit,AfterViewInit {

  private bannerListChanges!:MutationObserver;
  private isBannerListCreated:boolean=false;

  private _bannerListHtmlElement:Array<HTMLElement>;

  constructor(private elementRef:ElementRef,private renderer:Renderer2,private slideChangeService:SlideChangeService) {
  }
  ngAfterViewInit(): void {
    if(!this.isBannerListCreated) {
      this._bannerListHtmlElement=[...this.elementRef.nativeElement.children];
      this.addEventsForBannerItems();
    } 
  }
  ngOnInit(): void {
    this.bannerListChanges=new MutationObserver((mutations: MutationRecord[]) => {
      if(!this.isBannerListCreated){
        this._bannerListHtmlElement=[...this.elementRef.nativeElement.children];
        this.addEventsForBannerItems();
        this.isBannerListCreated=true;
      }
    });
    this.bannerListChanges.observe(this.elementRef.nativeElement, {
      childList:true
    });
  }
  ngOnDestroy(): void {
  }
  private setSlideChangeModel(bannerElement:HTMLElement){
    this.slideChangeService.setSlideChangeModel({index:this._bannerListHtmlElement.indexOf(bannerElement),slideChangeType:"banner"});
  }
  private addEventsForBannerItems(){
    this._bannerListHtmlElement.forEach(bannerElement => {
      this.renderer.listen(bannerElement,"mouseover",this.setSlideChangeModel.bind(this,bannerElement));
      this.renderer.listen(bannerElement,"click",this.setSlideChangeModel.bind(this,bannerElement));
    });
  }
}
