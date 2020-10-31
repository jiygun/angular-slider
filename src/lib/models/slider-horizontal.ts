import { Slider } from './slider';

export class HorizontalSlider extends Slider{

    constructor(currentSlide:number,previousSlide:number,defaultCurrentSlide:number,defaultLastSlide:number,copyFirstSlide:number,copyLastSlide:number,slideLength:number,slideWidth:number,slideBox:HTMLElement){
        super(currentSlide,previousSlide,defaultCurrentSlide,defaultLastSlide,copyFirstSlide,copyLastSlide,slideLength,slideWidth);
        slideBox?slideBox.style.transform=`translate3d(${this.slideLocation}px, 0px, 0px)`:null;
    }
    down($event:any,slideContainer:HTMLElement,slideBox:HTMLElement){
        super.slideDown($event.clientX||$event.touches[0].clientX,parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2)));
        slideBox.style.transitionDuration="0ms"
        slideBox.style.transform=`translate3d(${this.slideLocation}px,0px, 0px)`;
    }
    move($event:any,slideBox:HTMLElement){
        super.slideMove($event.clientX||($event.touches?$event.touches[0].clientX:0));
        this.isSlideClick&&this.isSlideMove?slideBox.style.transform=`translate3d(${this.slideLocation-this.moveLoc}px,0px, 0px)`:null;
    }
    up($event:any,slideBox:HTMLElement){
        if(this.isSlideClick&&this.isSlideMove){
            super.calculateSlideLocationSize();
            super.calculateSlideLocation();
            slideBox.style.transition="transform 400ms ease-out 0s";
            slideBox.style.transform=`translate3d(${this.slideLocation}px,0px, 0px)`;
        }
        super.slideUp();
    }
    resize(slideContainer:HTMLElement,slideBox:HTMLElement){
        slideBox.style.transition="transform 0s ease 0s";
        slideBox.style.transform=`translate3d(${-parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2))*this.activeSlide}px, 0px, 0px)`;
        this.slideLocation=-parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2))*this.activeSlide;
    }
    setSlideLocation(slideIndex:number,slideContainer:HTMLElement,slideBox:HTMLElement){
        if(slideIndex===0&&this.activeSlide===this.copyFirstSlide){
            this.activeSlide=this.defaultCurrentSlide;
            this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2));
            slideBox.style.transition="transform 0ms ease-out 0s";
            slideBox.style.transform=`translate3d(${this.slideLocation}px,0px, 0px)`;
        }else if(slideIndex+1===this.defaultLastSlide&&this.activeSlide===this.copyLastSlide){
            this.activeSlide=this.defaultLastSlide;
            this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2));
            slideBox.style.transition="transform 0ms ease-out 0s";
            slideBox.style.transform=`translate3d(${this.slideLocation}px,0px, 0px)`;
        }else{
            this.activeSlide=(slideIndex+1);
            this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2));
            slideBox.style.transition="transform 400ms ease-out 0s";
            slideBox.style.transform=`translate3d(${this.slideLocation}px,0px, 0px)`;
        }
    }
    changeActiveSlideWithCopySlideCheck(slideContainer:HTMLElement,slideBox:HTMLElement){
        if(this.activeSlide==this.copyFirstSlide){
            slideBox.style.transitionDuration="0ms";
            this.activeSlide=this.defaultCurrentSlide;
            this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2));
            slideBox.style.transform=`translate3d(${this.slideLocation}px,0px, 0px)`;
        }
        this.activeSlide=this.activeSlide+1;
        this.slideContainerSize=parseFloat(getComputedStyle(slideContainer).width.slice(0,getComputedStyle(slideContainer).width.length-2));
        slideBox.style.transition="transform 400ms ease-out 0s";
        slideBox.style.transform=`translate3d(${this.slideLocation}px,0px, 0px)`;
    }
}