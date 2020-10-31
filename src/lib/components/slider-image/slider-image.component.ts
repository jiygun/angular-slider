import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.scss']
})
export class SliderImageComponent implements OnInit {

  @Input() image:string;

  constructor() { 
  }
  ngOnInit(): void {
  }
  
}