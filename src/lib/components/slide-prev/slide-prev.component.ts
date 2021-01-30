import { Component, HostListener, OnInit } from '@angular/core';
import { SlideChangeService } from '../../services/slide-change.service';

@Component({
  selector: 'slide-prev',
  templateUrl: './slide-prev.component.html',
  styleUrls: ['./slide-prev.component.scss']
})
export class SlidePrevComponent implements OnInit {

  constructor(private slideChangeService:SlideChangeService) { }

  ngOnInit(): void {
  }
  @HostListener("click",["$event"])
  setActiveSlide(){
    this.slideChangeService.setSlideChangeModel({index:-1,slideChangeType:"nav"});
  }
}
