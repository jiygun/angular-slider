import { Slider } from './slider';

export class HorizontalSlider extends Slider {

  constructor(currentSlide: number, previousSlide: number, defaultCurrentSlide: number, defaultLastSlide: number, copyFirstSlide: number, copyLastSlide: number, slideLength: number, slideWidth: number, slideBox: HTMLElement) {
    super(currentSlide, previousSlide, defaultCurrentSlide, defaultLastSlide, copyFirstSlide, copyLastSlide, slideLength, slideWidth);
    if (slideBox) slideBox.style.transform = `translate3d(${this.slideLocation}px, 0px, 0px)`;
  }
  down(e: Event, slideContainer: HTMLElement, slideBox: HTMLElement) {
    this.setSlideContainerSize(slideContainer);
    super.slideDown(((e || window.event) as MouseEvent).clientX || ((e || window.event) as TouchEvent).touches[0].clientX || ((e || window.event) as TouchEvent).changedTouches[0].clientX, this.slideContainerSize);
    slideBox.style.transitionDuration = "0ms";
    slideBox.style.transform = `translate3d(${this.slideLocation}px,0px, 0px)`;
  }
  move(e: Event, slideBox: HTMLElement) {
    super.slideMove(((e || window.event) as MouseEvent).clientX || ((e || window.event) as TouchEvent).touches[0].clientX ||((e || window.event) as TouchEvent).changedTouches[0].clientX);
    if (this.isSlideClick && this.isSlideMove) slideBox.style.transform = `translate3d(${this.slideLocation - this.moveLoc}px,0px, 0px)`;
  }
  up(e: Event, slideBox: HTMLElement) {
    if (this.isSlideClick && this.isSlideMove) {
      super.calculateSlideLocation();
      slideBox.style.transition = "transform 400ms ease-out 0s";
      slideBox.style.transform = `translate3d(${this.slideLocation}px,0px, 0px)`;
    }
    super.slideUp();
  }
  resize(slideContainer: HTMLElement, slideBox: HTMLElement) {
    this.setSlideContainerSize(slideContainer);
    slideBox.style.transition = "transform 0s ease 0s";
    slideBox.style.transform = `translate3d(${-this.slideContainerSize * this.activeSlide}px, 0px, 0px)`;
    this.slideLocation = -this.slideContainerSize * this.activeSlide;
  }
  setSlideLocationForBannerAndTimer(slideIndex: number, slideContainer: HTMLElement, slideBox: HTMLElement) {
    if (this.activeSlide === this.copyFirstSlide) {
      this.activeSlide = this.defaultCurrentSlide;
      this.setSlideContainerSize(slideContainer);
      slideBox.style.transition = "transform 0ms ease-out 0s";
      slideBox.style.transform = `translate3d(${this.slideLocation}px,0px, 0px)`;
    } else if (this.activeSlide === this.copyLastSlide) {
      this.activeSlide = this.defaultLastSlide;
      this.setSlideContainerSize(slideContainer);
      slideBox.style.transition = "transform 0ms ease-out 0s";
      slideBox.style.transform = `translate3d(${this.slideLocation}px,0px, 0px)`;
    }
    this.activeSlide = slideIndex || this.activeSlide + 1;
    this.setSlideContainerSize(slideContainer);
    slideBox.style.transition = "transform 400ms ease-out 0s";
    slideBox.style.transform = `translate3d(${this.slideLocation}px,0px, 0px)`;
  }
  private setSlideContainerSize(slideContainer: HTMLElement): void {
    this.slideContainerSize = parseFloat(getComputedStyle(slideContainer).width.slice(0, getComputedStyle(slideContainer).width.length - 2));
  }
}
