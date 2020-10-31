import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss']
})
export class BannerImageComponent implements OnInit {

  @Input() image:string;
  
  constructor() { 
  }
  ngOnInit(): void {
  }
  
}