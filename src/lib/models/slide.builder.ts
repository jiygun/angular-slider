import { ElementRef, Renderer2 } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { SlideChangeModel, SlideChangeService } from "../services/slide-change.service";
import { SlideOptions, SlideResponsiveModel } from "./slide-options";

export type SlideChangeTypes = "nav" | "banner" | "timer";

type Events = Event | MouseEvent | TouchEvent;

enum SlideDefaultVeriables {
    DEFAULT_SLIDE_LOCATION = 0,
    DEFAULT_SLIDE_MARGIN = 0,
    DEFAULT_SHOWABLE_SLIDE = 1
}

export interface SlideEvents {
    slideDown(event: Events): void;
    slideMove(event: Events): void;
    slideUp(event: Events): void;
    slideResize(event: Events): void;
}

export class Slide {
    constructor(public slideElement: HTMLElement, private _width: number = 0, public height: number = 0, public margin: number = 0, public slideDuration: number = 4000) {
        slideElement.setAttribute("style", `width: ${_width}px !important; margin-right: ${margin}px !important;`);
    }
    get width(): number {
        return this._width;
    }
    set width(width: number) {
        this._width = width;
        this.slideElement.setAttribute("style", `width: ${width}px !important; margin-right: ${this.margin}px !important;`);
    }
}


export class SlideCalculator {

    public clickedLocation!: number;
    public moveLocation!: number;

    constructor(public slideLocation: number = 0, public slideListLength: number, public slideItemWidth: number, public slideMargin: number, public showAbleSlides: number, public clonedSlides: number) { }

    getCalculatedSlideLocation(): number {
        if (Math.abs(this.moveLocation / this.slideItemWidth) > 0.5) {
            if (this.moveLocation / this.slideItemWidth < 0) {
                this.slideLocation += this.slideItemWidth * (Math.round(Math.abs(this.moveLocation / this.slideItemWidth))) + (this.slideMargin * Math.round(Math.abs(this.moveLocation / this.slideItemWidth)));
            } else {
                this.slideLocation -= this.slideItemWidth * (Math.round(Math.abs(this.moveLocation / this.slideItemWidth))) + (this.slideMargin * Math.round(Math.abs(this.moveLocation / this.slideItemWidth)));
            }
        }
        if (this.slideLocation <= -(this.slideListLength - this.showAbleSlides) * (this.slideItemWidth + this.slideMargin)) this.slideLocation = -(this.slideListLength - this.showAbleSlides) * (this.slideItemWidth + this.slideMargin);
        if (this.slideLocation > 0) this.slideLocation = 0;
        return this.slideLocation;
    }

    checkSlideLocationIfIsLoop(callback: (slideLocation: number, isMustChange: boolean) => void) {
        if (Math.floor(this.slideLocation) === Math.floor(-(((this.slideListLength - this.showAbleSlides) * this.slideItemWidth) + this.slideMargin * (this.slideListLength - this.showAbleSlides)))) {
            this.slideLocation = -(((this.slideItemWidth * (this.clonedSlides * 2 - this.showAbleSlides)) + (this.clonedSlides * 2 - this.showAbleSlides) * this.slideMargin));
            callback(this.slideLocation, true);
        }
        if (this.slideLocation === 0) {
            this.slideLocation = -(((this.slideListLength - this.showAbleSlides * 2) * this.slideItemWidth) + this.slideMargin * ((this.slideListLength - this.showAbleSlides * 2)));
            callback(this.slideLocation, true);
        }
        //else callback(this.slideLocation,false);
    }

    static calculateContainerWidth(elementRef: ElementRef): number {
        return parseFloat(getComputedStyle(elementRef.nativeElement).width.slice(0, getComputedStyle(elementRef.nativeElement).width.length - 2));
    }

    static calculateSlideElementWidth(containerWidth: number, slideItems: number, margin: number): number {
        return (containerWidth / slideItems) - (margin * (slideItems - 1)) / slideItems;
    }
}

export class SlideEventListener implements SlideEvents {

    private _isSlideDown: boolean = false;
    private _isSlideMove: boolean = false;

    private _slideTimer!: Subscription;

    private _slideCalculator!: SlideCalculator;

    //private slideChangeService: SlideChangeService //= SlideChangeService.injector.get(SlideChangeService);

    constructor(private slideList: Slide[], private slideOptions: SlideOptions, private elementRef: ElementRef, private renderer: Renderer2) {
        this._slideCalculator = new SlideCalculator(SlideDefaultVeriables.DEFAULT_SLIDE_LOCATION,
            slideList.length, slideList.filter(x => x).shift().width, slideOptions.margin,
            this.slideOptions.responsive ? this.slideOptions.responsive.find((responsiveModel: SlideResponsiveModel) => responsiveModel.breakPoint < window.innerWidth).items : slideOptions.items, this.slideOptions.items);
        if (this.slideOptions.loop) this.initSlideLocationForLoop();
        this.initSlideEvents();
        this.createTimer();
        this.slideChangeListener();
    }

    private initSlideLocationForLoop() {
        const slideContainerWidth: number = SlideCalculator.calculateContainerWidth(this.elementRef);
        this._slideCalculator.slideLocation = -(slideContainerWidth + this.slideOptions.margin) * this.slideOptions.items / (this.slideOptions.responsive ? this.slideOptions.responsive.find((responsiveModel: SlideResponsiveModel) => responsiveModel.breakPoint < window.innerWidth).items : this.slideOptions.items);
        this.moveSlideToNewLocation(this._slideCalculator.slideLocation, 0);
    }

    private initSlideEvents(): void {
        this.renderer.listen(this.elementRef.nativeElement, "mousedown", this.slideDown.bind(this));
        this.renderer.listen(this.elementRef.nativeElement, "touchstart", this.slideDown.bind(this));
        this.renderer.listen(window, "mousemove", this.slideMove.bind(this));
        this.renderer.listen(window, "touchmove", this.slideMove.bind(this));
        this.renderer.listen(window, "mouseup", this.slideUp.bind(this));
        this.renderer.listen(window, "touchend", this.slideUp.bind(this));
        this.renderer.listen(window, "resize", this.slideResize.bind(this));
    }

    slideDown(event: Events): void {
        event.preventDefault();
        this._isSlideDown = true;
        if (this._slideTimer) this._slideTimer.unsubscribe();
        if (this.slideOptions.loop) this._slideCalculator.checkSlideLocationIfIsLoop((slideLocation: number, isMustChange: boolean) => { if (isMustChange) this.moveSlideToNewLocation(slideLocation, 0); });
        this._slideCalculator.clickedLocation = this.getClientX(event) | 0;
    }

    slideMove(event: Events): void {
        event.stopPropagation();
        if (this._isSlideDown) {
            if (this._slideTimer) this._slideTimer.unsubscribe();
            this._slideCalculator.moveLocation = this._slideCalculator.clickedLocation - this.getClientX();
            this.moveSlideToNewLocation(this._slideCalculator.slideLocation - this._slideCalculator.moveLocation, 0);
            this._isSlideMove = true;
        }
    }

    slideUp(event: Events): void {
        if (this._isSlideDown) this.createTimer();
        if (this._isSlideDown) event.currentTarget.removeEventListener('click', this.clearEvents, true);
        if (this._isSlideDown && this._isSlideMove) {
            this._isSlideDown = false;
            this._isSlideMove = false;
            this.moveSlideToNewLocation(this._slideCalculator.getCalculatedSlideLocation(), this.slideOptions.duration);
            event.currentTarget.addEventListener('click', this.clearEvents, true);
        }
    }

    slideResize(event: Events): void {
        if (this._slideTimer) this._slideTimer.unsubscribe();
        const slideContainerWidth: number = SlideCalculator.calculateContainerWidth(this.elementRef);
        const slideElementWidth = SlideCalculator.calculateSlideElementWidth(slideContainerWidth, this._slideCalculator.showAbleSlides, this.slideOptions.margin);
        if (this.slideOptions.responsive && this.slideOptions.responsive.length && this._slideCalculator.showAbleSlides !== this.slideOptions.responsive.find((responsiveModel: SlideResponsiveModel) => responsiveModel.breakPoint < window.innerWidth).items) {
            const newSlideElementWidth = SlideCalculator.calculateSlideElementWidth(slideContainerWidth, this.slideOptions.responsive.find((responsiveModel: SlideResponsiveModel) => responsiveModel.breakPoint < window.innerWidth).items, this.slideOptions.margin);
            this._slideCalculator.slideLocation += (this.slideList.filter(x => x).shift().width - newSlideElementWidth) * (-this._slideCalculator.slideLocation / (this.slideList.filter(x => x).shift().width + this.slideOptions.margin));
            this.slideList.forEach((slide: Slide) => slide.width = newSlideElementWidth);
            this._slideCalculator.slideItemWidth = newSlideElementWidth;
            this._slideCalculator.showAbleSlides = this.slideOptions.responsive.find((responsiveModel: SlideResponsiveModel) => responsiveModel.breakPoint < window.innerWidth).items;
            this.moveSlideToNewLocation(this._slideCalculator.slideLocation, 0);
        } else if (slideElementWidth !== this.slideList.filter(x => x).shift().width) {
            this._slideCalculator.slideLocation += (this.slideList.filter(x => x).shift().width - slideElementWidth) * (-this._slideCalculator.slideLocation / (this.slideList.filter(x => x).shift().width + this.slideOptions.margin));
            this.slideList.forEach((slide: Slide) => slide.width = slideElementWidth);
            this._slideCalculator.slideItemWidth = slideElementWidth;
            this.moveSlideToNewLocation(this._slideCalculator.slideLocation, 0);
        }
        this.createTimer();
    }

    private clearEvents(event: Events) {
        event.preventDefault();
    }

    private getClientX(event: Event = window.event): number {
        return ((event as MouseEvent).clientX || ((event as TouchEvent).touches ? (event as TouchEvent).touches[0].clientX : 0 || (event as TouchEvent).changedTouches ? (event as TouchEvent).changedTouches[0].clientX : 0)) || 0;
    }

    private moveSlideToNewLocation(slideLocation: number, isHaveDuration: number): void {
        this.elementRef.nativeElement.style.transition = `transform ${isHaveDuration}ms ease-out 0s`;
        this.elementRef.nativeElement.style.transform = `translate3d(${slideLocation}px,0px, 0px)`;
    }

    private createTimer() {
        if (this.slideOptions.loop) {
            this._slideTimer = timer(this.slideOptions.timer, this.slideOptions.timer).subscribe(t => {
                this.setSlideLocationWithIndex(1, "timer");
            });
        }
    }

    private slideChangeListener() {
        SlideChangeService.instance.slideChangeModel.subscribe((slideChangeModel: SlideChangeModel) => {
            if (slideChangeModel) {
                if (this._slideTimer) this._slideTimer.unsubscribe();
                this.setSlideLocationWithIndex(slideChangeModel.index, slideChangeModel.slideChangeType);
                this.createTimer();
            }
        });
    }

    private setSlideLocationWithIndex(locationIndex: number, changeType: SlideChangeTypes) {
        if (changeType === "timer") {
            this._slideCalculator.slideLocation -= (this.slideList.filter(x => x).shift().width + this.slideOptions.margin) * locationIndex;
            this.moveSlideLocationForChangeTypes();
        }
        if (changeType === "nav") {
            if (this._slideCalculator.slideLocation != SlideDefaultVeriables.DEFAULT_SLIDE_LOCATION && locationIndex != 1) this._slideCalculator.slideLocation -= (this.slideList.filter(x => x).shift().width + this.slideOptions.margin) * locationIndex;
            if (this._slideCalculator.slideLocation != -([...this.elementRef.nativeElement.children].length - 1) * (this.slideList.filter(x => x).shift().width + this.slideOptions.margin) && locationIndex != -1) this._slideCalculator.slideLocation -= (this.slideList.filter(x => x).shift().width + this.slideOptions.margin) * locationIndex;
            this.moveSlideLocationForChangeTypes();

        }
        if (changeType === "banner" && this._slideCalculator.showAbleSlides === 1) {
            this._slideCalculator.slideLocation = -(this.slideList.filter(x => x).shift().width + this.slideOptions.margin) * this._slideCalculator.clonedSlides - (this.slideList.filter(x => x).shift().width + this.slideOptions.margin) * locationIndex;
            this.moveSlideLocationForChangeTypes();
        }
    }

    private moveSlideLocationForChangeTypes() {
        this.moveSlideToNewLocation(this._slideCalculator.slideLocation, this.slideOptions.duration);
        if (this.slideOptions.loop) this._slideCalculator.checkSlideLocationIfIsLoop((slideLocation: number, isMustChange: boolean) => {
            if (isMustChange) timer(this.slideOptions.duration).subscribe((r) => this.moveSlideToNewLocation(slideLocation, 0));
        });
    }
}

export class SlideBuilder {

    constructor(private elementRef: ElementRef, private slideOptions: SlideOptions, private renderer: Renderer2) {
        new SlideEventListener(this.initSlideList(), this.checkSlideOptions(), elementRef, renderer);
    }

    private checkSlideOptions(): SlideOptions {
        return {
            items: this.slideOptions.items < 1 ? SlideDefaultVeriables.DEFAULT_SHOWABLE_SLIDE : this.slideOptions.items,
            loop: this.slideOptions.loop === null || this.slideOptions === undefined ? false : this.slideOptions.loop,
            margin: !this.slideOptions.margin ? SlideDefaultVeriables.DEFAULT_SLIDE_MARGIN : this.slideOptions.margin,
            duration: !this.slideOptions.duration ? 400 : this.slideOptions.duration,
            responsive: this.slideOptions.responsive,
            timer: this.slideOptions.timer
        }
    }

    private initSlideList(): Slide[] {
        const slideContainerWidth: number = SlideCalculator.calculateContainerWidth(this.elementRef);
        let slideElementWidth = SlideCalculator.calculateSlideElementWidth(slideContainerWidth, this.slideOptions.items, this.slideOptions.margin)
        if (this.slideOptions.responsive.find((responsiveModel: SlideResponsiveModel) => responsiveModel.breakPoint < window.innerWidth).items) {
            slideElementWidth = SlideCalculator.calculateSlideElementWidth(slideContainerWidth, this.slideOptions.responsive.find((responsiveModel: SlideResponsiveModel) => responsiveModel.breakPoint < window.innerWidth).items, this.slideOptions.margin);
        }
        if (this.slideOptions.loop) return this.createSlideListWithClones(slideElementWidth);
        return [...this.elementRef.nativeElement.children].map((slideElement: HTMLElement) => new Slide(slideElement, slideElementWidth, 0, this.slideOptions.margin, this.slideOptions.duration));
    }

    private createSlideListWithClones(slideElementWidth: number): Slide[] {
        const slideListBeforeColend: HTMLElement[] = [...this.elementRef.nativeElement.children];
        const slideListCloned: HTMLElement[] = [...slideListBeforeColend.slice(slideListBeforeColend.length - this.slideOptions.items, slideListBeforeColend.length), ...slideListBeforeColend, ...slideListBeforeColend.slice(0, this.slideOptions.items)];
        let newSlideListHtml: string;
        slideListCloned.reduce((result: HTMLElement, item: HTMLElement) => {
            if (!newSlideListHtml) newSlideListHtml = result.outerHTML;
            newSlideListHtml += item.outerHTML
            return item;
        });
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', newSlideListHtml);
        return [...this.elementRef.nativeElement.children].map((slideElement: HTMLElement) => new Slide(slideElement, slideElementWidth, 0, this.slideOptions.margin, this.slideOptions.duration));
    }
}