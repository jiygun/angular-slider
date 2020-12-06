import {  AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {  Subscription, timer } from 'rxjs';
import { HorizontalSlider } from "../../models/slider-horizontal";
import { SliderChangeService } from "../../services/slider-change.service";

@Component({
  selector: 'sliderlist-horizontal',
  templateUrl: './sliderlist-horizontal.component.html',
  styleUrls: ['./sliderlist-horizontal.component.scss'],
  host:{"(mousedown)": "onMouseDown($event)","(touchstart)": "onMouseDown($event)","(window:mousemove)":"onMouseMove($event)","(window:mouseup)":"onMouseUp($event)",
  "(window:resize)":"onResize()","(window:touchmove)":"onMouseMove($event)",
  "(window:touchend)":"onMouseUp($event)"}
})
export class SliderListHorizontalComponent implements OnDestroy,AfterViewChecked {


  private _slider:HorizontalSlider;

  private _sliderItemList:Array<HTMLElement>;

  private _sliderHtmlElement:HTMLElement;
  private _sliderListHtmlElement:HTMLElement;

  private _sliderTimer:Subscription;
  private _sliderChangerSubscription:Subscription;

  @Input() delayTime:number;

  @Output() activeSlide:EventEmitter<number>;
  @Output() clickedSlide:EventEmitter<number>;

  constructor(private elementRef:ElementRef,private sliderChangeService:SliderChangeService) { 
    this.activeSlide=new EventEmitter();
    this.clickedSlide=new EventEmitter();
  }
  ngAfterViewChecked(): void {
    if([...this.elementRef.nativeElement.children].length>0&&!this._sliderItemList){
      this._sliderHtmlElement=this.elementRef.nativeElement.parentNode;
      this._sliderListHtmlElement=this.elementRef.nativeElement;
      this._sliderItemList=[...this.elementRef.nativeElement.children];
      this._slider=new HorizontalSlider(1,0,1,this._sliderItemList.length-2,this._sliderItemList.length-1,0,this._sliderItemList.length,parseFloat(getComputedStyle(this._sliderHtmlElement).width.slice(0,getComputedStyle(this._sliderHtmlElement).width.length-2)),this._sliderListHtmlElement);
      this.changeActiveSlider();
    }
  }
  ngOnDestroy(): void {
    this._sliderTimer.unsubscribe();
    this._sliderChangerSubscription.unsubscribe();
  }
  private createSliderTimer(){
    this._sliderTimer=timer(this.delayTime||4000,this.delayTime||4000).subscribe(t=>{
      if(this._slider){
        this._slider.changeActiveSlideWithCopySlideCheck(this._sliderHtmlElement,this._sliderListHtmlElement);
        this.activeSlide.emit(this._slider.currentActiveSlide);
      }
    });
  }
  onMouseDown($event){
    $event.preventDefault();
    if(this._slider) this._slider.down($event,this._sliderHtmlElement,this._sliderListHtmlElement);
    if(this._sliderTimer) this._sliderTimer.unsubscribe();
  }
  onMouseMove($event){
    $event.stopPropagation();
    if(this._slider&&this._slider.isSlideClick){
      if(this._sliderTimer) this._sliderTimer.unsubscribe();
      this._slider.move($event,this._sliderListHtmlElement);
    };
  }
  onMouseUp($event){
    if(!this._slider.isSlideMove&&this._slider.isSlideClick) this.clickedSlide.emit(this._slider.activeSlide);
    if(this._sliderTimer) this._sliderTimer.unsubscribe();
    if(this._slider) (this._slider.up($event,this._sliderListHtmlElement),this.createSliderTimer());
    this.activeSlide.emit(this._slider.currentActiveSlide);
  }
  onResize(){
    if(this._slider) this._slider.resize(this._sliderHtmlElement,this._sliderListHtmlElement);
  }
  private changeActiveSlider(){
    this._sliderChangerSubscription=this.sliderChangeService.activeSlide.subscribe((activeSlide:number)=>{
      if(this._sliderTimer) this._sliderTimer.unsubscribe();
      if(this._slider){
        this._slider.setSlideLocation(activeSlide,this._sliderHtmlElement,this._sliderListHtmlElement);
        this.activeSlide.emit(this._slider.currentActiveSlide);
      }
      this.createSliderTimer();
    });
  }
}