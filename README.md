# Slider-Angular

With Banner
![](https://media.giphy.com/media/gf6Zn6hyMKwT93cc3u/giphy.gif)

Without Banner
![](https://media.giphy.com/media/MAWiiAke5YvbWHA5oR/giphy.gif)

  
  

# Usage

  

```hs

npm install slider-angular --save

```

 
Import Module

```

import { SliderAngularModule } from 'slider-angular';

@NgModule({

imports: [

SliderAngularModule

]

})

```

In Component

  

```hs
With Banner
<slider-angular [slideList]="objectList" [bannerList]="bannerList" [isSlideHorizontal]="true or false" (activeSlide)="activeSlide($event)" (clickedSlide)="clickedSlide($event)"></slider-angular>

Without Banner

<slider-angular [slideList]="objectList" [isSlideHorizontal]="true or false" (activeSlide)="activeSlide($event)" (clickedSlide)="clickedSlide($event)"></slider-angular>
```

  

Objects

  

- Your object list must be equal or higher than two.

  

Only With Images

```hs

import { SlideModel,BannerModel } from 'slider-angular';

objectList:Array<SlideModel>;
bannerList:Array<BannerModel>;

constructor(private changeDetector: ChangeDetectorRef){   
 this.objectList=new Array<SlideModel>();
 this.bannerList=new Array<BannerModel>();
}

ngAfterViewInit(): void {
    //Fill your objectList
    objectList=[new SlideModel("Your image path"),];
    //Fill your bannerList
    bannerList=[new BannerModel("Your image path"),];
    this.changeDetector.detectChanges();
}

```

With Parameters

  

```hs

ngAfterViewInit(): void {
    //Fill your objectList
    objectList=[new SlideModel(imagePath,isHaveLine,lineLocation,isHaveOpacity,lineHeader,lineContent,headerLocation,contentLocation)];
}


-Or-

objectList=[{

imagePath:"Your image path",

isHaveLine:true or false,

lineLocation:"left" or "right" or "top" or "bottom",

isHaveOpacity:true or false,

lineHeader:"Your line head",

lineContent:"Your line content",

headerLocation:"left" or "right" or "center",

contentLocation:"left" or "right" or "center",

},];

```
