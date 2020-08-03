import { Slider } from './slider';

export class HorizontalSlider extends Slider{

    constructor(currentSlide:number,previousSlide:number,defaultCurrentSlide:number,defaultLastSlide:number,copyFirstSlide:number,copyLastSlide:number,slideLength:number,slideWidth:number,slideBox:HTMLElement){
        super(currentSlide,previousSlide,defaultCurrentSlide,defaultLastSlide,copyFirstSlide,copyLastSlide,slideLength,slideWidth);
        slideBox!=null||slideBox!=undefined||typeof slideBox=="object"?slideBox.style.transform=`translate3d(${this.slideLocation}px, 0px, 0px)`:null;
    }
    down($event:any,slideContainer:HTMLElement,slideBox:HTMLElement){
        $event.preventDefault();
        super.slideDown($event.clientX,parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2)));
        slideBox.style.transitionDuration="0ms"
        slideBox.style.transform=`translate3d(${this.slideLocation}px,0px, 0px)`;
        this.isSlideMove==false?$event.currentTarget.removeEventListener('click',super.clearEvents,true):null;
    }
    move($event:any,slideBox:HTMLElement){
        super.slideMove($event.clientX);
        this.isSlideClick&&this.isSlideMove?slideBox.style.transform=`translate3d(${this.slideLocation-this.moveLoc}px,0px, 0px)`:null;
    }
    up($event:any,slideBox:HTMLElement){
        this.isSlideClick&&this.isSlideMove?(super.calculateSlideLocationSize(),super.calculateSlideLocation(),
        slideBox.style.transition="transform 400ms ease-out 0s",slideBox.style.transform=`translate3d(${this.slideLocation}px,0px, 0px)`,
        $event.target.className==='slider__image'?$event.target.parentNode.parentNode.parentNode.addEventListener('click',super.clearEvents,true):null):null;
        super.slideUp();
    }
    resize(slideContainer:HTMLElement,slideBox:HTMLElement){
        slideBox.style.transition="transform 0s ease 0s";
        slideBox.style.transform=`translate3d(${-parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2))*this.activeSlide}px, 0px, 0px)`;
        this.slideLocation=-parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2))*this.activeSlide;
    }
}