import { Slider } from './slider';

export class VerticalSlider extends Slider{

    constructor(currentSlide:number,previousSlide:number,defaultCurrentSlide:number,defaultLastSlide:number,copyFirstSlide:number,copyLastSlide:number,slideLength:number,slideHeight:number,slideBox:HTMLElement){
        super(currentSlide,previousSlide,defaultCurrentSlide,defaultLastSlide,copyFirstSlide,copyLastSlide,slideLength,slideHeight);
        slideBox?slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`:null;
    }
    down($event:any,slideContainer:HTMLElement,slideBox:HTMLElement){
        const containerSize=parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2));
        super.slideDown($event.clientY||$event.touches[0].clientY,containerSize);
        slideBox.style.transitionDuration="0ms"
        slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`;
    }
    move($event:any,slideBox:HTMLElement){
        super.slideMove($event.clientY||($event.touches?$event.touches[0].clientY:0));
        this.isSlideClick&&this.isSlideMove?slideBox.style.transform=`translate3d(0px,${-this.moveLoc+this.slideLocation}px, 0px)`:null;
    }
    up($event:any,slideBox:HTMLElement){
        if(this.isSlideClick&&this.isSlideMove){
            super.calculateSlideLocationSize();
            super.calculateSlideLocation();
            slideBox.style.transition="transform 400ms ease-out 0s";
            slideBox.style.transform=`translate3d(0px,${this.slideLocation}px, 0px)`;
        }
        super.slideUp();
    }
    resize(slideContainer:HTMLElement,slideBox:HTMLElement){
        slideBox.style.transition="transform 0s ease 0s";
        slideBox.style.transform=`translate3d(0px, ${-parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2))*this.activeSlide}px, 0px)`;
        this.slideLocation=-parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2))*this.activeSlide;
    }
    setSlideLocation(slideIndex:number,slideContainer:HTMLElement,slideBox:HTMLElement){
        if(slideIndex===0&&this.activeSlide===this.copyFirstSlide){
            this.activeSlide=this.defaultCurrentSlide;
            this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2));
            slideBox.style.transition="transform 0ms ease-out 0s";
            slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`;
        }else if(slideIndex+1===this.defaultLastSlide&&this.activeSlide===this.copyLastSlide){
            this.activeSlide=this.defaultLastSlide;
            this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2));
            slideBox.style.transition="transform 0ms ease-out 0s";
            slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`;
        }else{
            this.activeSlide=(slideIndex+1);
            this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2));
            slideBox.style.transition="transform 400ms ease-out 0s";
            slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`;
        }
    }
    changeActiveSlideWithCopySlideCheck(slideContainer:HTMLElement,slideBox:HTMLElement){
        if(this.activeSlide==this.copyFirstSlide){
            slideBox.style.transitionDuration="0ms";
            this.activeSlide=this.defaultCurrentSlide;
            this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2));
            slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`;
        }
        this.activeSlide=this.activeSlide+1;
        this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).height.slice(0,getComputedStyle(slideContainer).height.length-2));
        slideBox.style.transition="transform 400ms ease-out 0s";
        slideBox.style.transform=`translate3d(0px, ${this.slideLocation}px, 0px)`;
    }
}