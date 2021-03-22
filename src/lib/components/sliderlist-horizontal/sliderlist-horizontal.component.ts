import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SlideOptions } from '../../models/slide.options';
import { SlideEventService } from '../../services/events/event.service';
import { OptionsListener } from '../../services/change-listeners/options.listener.service';
import { SlideBuilderService } from '../../services/builders/slide.builder.service';
import { WidthBuilder } from '../../services/builders/width.builder.service';
import { ChangeBuilder } from '../../services/builders/change.builder.service';

@Component({
  selector: 'sliderlist-horizontal',
  templateUrl: './sliderlist-horizontal.component.html',
  styleUrls: ['./sliderlist-horizontal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SlideBuilderService, SlideEventService, WidthBuilder, ChangeBuilder]
})
export class SliderListHorizontalComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() slideOptions!: SlideOptions;

  private slideListChanges!: MutationObserver

  private isSlideCreatedFirstTime: boolean = false;

  constructor(private slideEventService: SlideEventService, private optionsListener: OptionsListener, private elementRef: ElementRef) { }

  ngOnDestroy(): void {
    this.slideListChanges.disconnect();
  }

  ngOnInit(): void {
    this.slideListChanges = new MutationObserver((mutations: MutationRecord[]) => {
      if (!this.isSlideCreatedFirstTime) {
        this.optionsListener.setSlideOptions(this.slideOptions);
        this.isSlideCreatedFirstTime = true;
      };
    });
    this.slideListChanges.observe(this.elementRef.nativeElement, {
      childList: true
    });
  }

  ngOnChanges(): void {
    if (this.slideOptions && !this.isSlideCreatedFirstTime && this.elementRef.nativeElement.children.length) {
      this.optionsListener.setSlideOptions(this.slideOptions);
      this.isSlideCreatedFirstTime = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.slideOptions && !this.isSlideCreatedFirstTime && this.elementRef.nativeElement.children.length) {
      this.optionsListener.setSlideOptions(this.slideOptions);
      this.isSlideCreatedFirstTime = true;
    }
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  private onClick(event: Event): void {
    this.slideEventService.slideDown(event);
  }

  @HostListener('window:touchmove', ['$event'])
  @HostListener('window:mousemove', ['$event'])
  private onMove(event: Event) {
    this.slideEventService.slideMove(event);
  }

  @HostListener('window:touchend', ['$event'])
  @HostListener('window:mouseup', ['$event'])
  private onUp(event: Event) {
    this.slideEventService.slideUp(event);
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event) {
    this.slideEventService.slideResize(event);
  }
}
