import { Component, HostListener, OnInit } from '@angular/core';
import { SlideChangeService } from '../../services/slide-change.service';

@Component({
  selector: 'slide-next',
  templateUrl: './slide-next.component.html',
  styleUrls: ['./slide-next.component.scss'],
})
export class SlideNextComponent implements OnInit {

  constructor(private slideChangeService:SlideChangeService) { }

  ngOnInit(): void {
  }
  @HostListener("click",["$event"])
  setActiveSlide(){
    this.slideChangeService.setSlideChangeModel({index:1,slideChangeType:"nav"});
  }
}
