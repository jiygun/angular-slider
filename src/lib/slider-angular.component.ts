import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, IterableChanges, IterableDiffer, IterableDiffers, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SlideModel } from './slide-model';
import { HorizontalSlider } from './slider.horizontal';
import { VerticalSlider } from './slider.vertical';

@Component({
  selector: 'slider-angular',
  templateUrl: './slider-angular.component.html',
  styleUrls: ['./slider-angular.component.scss'],
  host:{"(window:mousemove)":"onMouseMove($event)","(window:mouseup)":"onMouseUp($event)",
  "(window:resize)":"onResize($event)"}
})
export class SliderAngularComponent implements OnInit,AfterViewInit,OnChanges,DoCheck {

  @Input() slideList:Array<any>;
  @Input() isSlideHorizontal:boolean;
  @Output() activeSlide:EventEmitter<number>;
  @Output() clickedSlide:EventEmitter<number>;

  private _slideItemList:Array<SlideModel>;
  private _isSlideHorizontal:boolean;

  @ViewChild('slide') slideElement:ElementRef;
  @ViewChild('slideList') slideListElement:ElementRef;

  private _slider:any;

  private _slideListDiffer: IterableDiffer<Array<{}>>;

  constructor(private iterableDiffers:IterableDiffers) { 
    this._slideItemList=new Array();
    this.activeSlide=new EventEmitter();
    this.clickedSlide=new EventEmitter();
    this._isSlideHorizontal=true;
  }
  ngOnInit(): void {
    this._slideListDiffer = this.iterableDiffers.find(this.slideList).create();
  }
  ngAfterViewInit(): void {
    if(this._slideItemList!=undefined&&this._slideItemList!=null&&this._slideItemList.length>=2){
      this._isSlideHorizontal?
      this._slider=new HorizontalSlider(null,null,null,this._slideItemList.length-2,this._slideItemList.length-1,null,this._slideItemList.length,parseFloat(getComputedStyle(this.slideElement.nativeElement).width.slice(0,getComputedStyle(this.slideElement.nativeElement).width.length-2)),this.slideListElement.nativeElement):
      this._slider=new VerticalSlider(null,null,null,this._slideItemList.length-2,this._slideItemList.length-1,null,this._slideItemList.length,parseFloat(getComputedStyle(this.slideElement.nativeElement).height.slice(0,getComputedStyle(this.slideElement.nativeElement).height.length-2)),this.slideListElement.nativeElement);
    }else{
      this._isSlideHorizontal?
      this._slider=new HorizontalSlider(null,null,null,null,null,null,null,parseFloat(getComputedStyle(this.slideElement.nativeElement).width.slice(0,getComputedStyle(this.slideElement.nativeElement).width.length-2)),this.slideListElement.nativeElement):
      this._slider=new VerticalSlider(null,null,null,null,null,null,null,parseFloat(getComputedStyle(this.slideElement.nativeElement).height.slice(0,getComputedStyle(this.slideElement.nativeElement).height.length-2)),this.slideListElement.nativeElement);
    }
  }
  ngDoCheck(): void {
    const slideChanges:IterableChanges<Array<{}>>=this._slideListDiffer.diff(this.slideList);
    if(slideChanges&&this.slideList!=undefined&&this.slideList!=null&&this.slideList.length>=2){
      this._slideItemList=this.slideList.slice(this.slideList.length-1,this.slideList.length).concat(this.slideList).concat(this.slideList.slice(0,1));
      if(this._slider!=undefined&&this._slider!=null){
        this._slider.slideLength=this._slideItemList.length;
        this._slider.defaultLastSlide=this._slideItemList.length-2;
        this._slider.copyFirstSlide=this._slideItemList.length-1;
        this._slider.fixSlideLocation(this.slideElement.nativeElement,this.slideListElement.nativeElement);
      }
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.isSlideHorizontal!=undefined&&changes.isSlideHorizontal.currentValue!=changes.isSlideHorizontal.previousValue){
      if(changes.isSlideHorizontal.currentValue!=null&&changes.isSlideHorizontal.currentValue!=undefined&&typeof changes.isSlideHorizontal.currentValue=='boolean'){
        this._isSlideHorizontal=changes.isSlideHorizontal.currentValue;
      }
    }
  }
  onMouseDown($event){
    $event.preventDefault();
    this._slider!=undefined?this._slider.down($event,this.slideElement.nativeElement,this.slideListElement.nativeElement):null;
  }
  onMouseMove($event){
    $event.stopPropagation();
    this._slider!=undefined?this._slider.move($event,this.slideListElement.nativeElement):null;
  }
  onMouseUp($event){
    $event.preventDefault();
    !this._slider.isSlideMove&&this._slider.isSlideClick?this.clickedSlide.emit(this._slider.activeSlide):null;
    this._slider!=undefined?this._slider.up($event,this.slideListElement.nativeElement):null;
    this.activeSlide.emit(this._slider.activeSlide)
  }
  onResize($event){
    this._slider!=undefined&&!this.isListEmpty()?this._slider.resize(this.slideElement.nativeElement,this.slideListElement.nativeElement):null;
  }
  private isListEmpty():boolean{
    return this._slideItemList!=null&&this._slideItemList!=undefined&&this._slideItemList.length>=2?false:true;
  }
  get slideListClass(){
    return this._isSlideHorizontal?"slide__list--horizontal":"slide__list--vertical";
  }
  get slideItemList():Array<SlideModel>{ 
    return this._slideItemList;
  }
  checkLine(isHaveLine:boolean){
    return isHaveLine;
  }
  getLineClass(lineLocation:string){
    if(lineLocation==null||lineLocation==undefined) return "";
    return "line--"+lineLocation;
  }
  getOpacityClass(isHaveOpacity:boolean){
    if(isHaveOpacity==null||isHaveOpacity==undefined) return false;
    return isHaveOpacity?true:false;
  }
  getHeaderLocationClass(headerLocation:string){
    if(headerLocation==null||headerLocation==undefined) return "header--left";
    return "header--"+headerLocation;
  }
  getContentLocationClass(contentLocation:string){
    if(contentLocation==null||contentLocation==undefined) return "content--left";
    return "content--"+contentLocation;
  }
}