import { Slider } from './slider';

export class VerticalSlider extends Slider{

    constructor(currentSlide:number,previousSlide:number,defaultCurrentSlide:number,defaultLastSlide:number,copyFirstSlide:number,copyLastSlide:number,slideLength:number,slideHeight:number,slideBox){
        super(currentSlide,previousSlide,defaultCurrentSlide,defaultLastSlide,copyFirstSlide,copyLastSlide,slideLength,slideHeight);
        slideBox!=null&&slideBox!=undefined&&typeof slideBox=="object"?slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`:null;
    }
    down($event:any,slideContainer:HTMLElement,slideBox:HTMLElement){
        $event.preventDefault();
        super.slideDown($event.clientY||$event.touches[0].clientY,parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2)));
        slideBox.style.transitionDuration="0ms"
        slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`;
        this.isSlideMove==false?$event.currentTarget.removeEventListener('click', super.clearEvents, true):null;
    }
    move($event:any,slideBox){
        super.slideMove($event.clientY||$event.touches[0].clientY);
        this.isSlideClick&&this.isSlideMove?slideBox.style.transform=`translate3d(0px,${-this.moveLoc+this.slideLocation}px, 0px)`:null;
    }
    up($event:any,slideBox){
        this.isSlideClick&&this.isSlideMove?(super.calculateSlideLocationSize(),super.calculateSlideLocation(),
        slideBox.style.transition="transform 400ms ease-out 0s",slideBox.style.transform=`translate3d(0px,${this.slideLocation}px, 0px)`,
        $event.target.className==='slider__image'?$event.target.parentNode.parentNode.parentNode.addEventListener('click',super.clearEvents,true):null):null;
        super.slideUp();
    }
    resize(slideContainer:HTMLElement,slideBox:HTMLElement){
        slideBox.style.transition="transform 0s ease 0s";
        slideBox.style.transform=`translate3d(0px, ${-parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2))*this.activeSlide}px, 0px)`;
        this.slideLocation=-parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2))*this.activeSlide;
    }
    fixSlideLocation(slideContainer:HTMLElement,slideBox:HTMLElement){
        this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2));
        slideBox.style.transitionDuration="0ms"
        slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`;
    }
}