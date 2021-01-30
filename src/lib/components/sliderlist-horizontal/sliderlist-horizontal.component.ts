import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SlideOptions } from '../../models/slide-options';
import { SlideBuilder } from "../../models/slide.builder";

@Component({
  selector: 'sliderlist-horizontal',
  templateUrl: './sliderlist-horizontal.component.html',
  styleUrls: ['./sliderlist-horizontal.component.scss'],
})
export class SliderListHorizontalComponent implements OnInit,OnDestroy,AfterViewInit{

  @Input() slideOptions!:SlideOptions;

  private slideListChanges!:MutationObserver

  private isSlideCreatedFirstTime:boolean=false;

  private slideBuilder!:SlideBuilder;

  constructor(private elementRef: ElementRef,private renderer:Renderer2) {

  }
  ngOnDestroy(): void {
    this.slideListChanges.disconnect();
  }
  ngOnInit(): void {
    this.slideListChanges=new MutationObserver((mutations: MutationRecord[]) => {
      if(!this.isSlideCreatedFirstTime) {
        if(this.slideOptions&&!this.slideBuilder) new SlideBuilder(this.elementRef,this.slideOptions,this.renderer);
        this.isSlideCreatedFirstTime=true;
      };
    });
    this.slideListChanges.observe(this.elementRef.nativeElement, {
      childList:true
    });
  }
  ngAfterViewInit(): void {
    if(this.slideOptions&&!this.slideBuilder && [...this.elementRef.nativeElement.children].length>0) new SlideBuilder(this.elementRef,this.slideOptions,this.renderer);
      
  }
  ngOnChanges(): void {
    if(this.slideOptions&&this.isSlideCreatedFirstTime&&!this.slideBuilder) new SlideBuilder(this.elementRef,this.slideOptions,this.renderer);
  }
}