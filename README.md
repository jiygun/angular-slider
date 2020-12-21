# Slider-Angular

![](https://media.giphy.com/media/gf6Zn6hyMKwT93cc3u/giphy.gif)

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

<slider-angular>
    <slider>
        <!--Optional : <sliderlist-vertical>-->
        <sliderlist-horizontal [delayTime]="Default:4000" (activeSlide)="activeSlide($event)" (clickedSlide)="clickedSlide($event)">
            <slider-item>
                <slider-image [image]="Copy Last Slide"></slider-image>
            </slider-item>
            <slider-item>
                <slider-image [image]="First Slide"></slider-image>
            </slider-item>
            .
            .
            .
            <slider-item>
                <slider-image [image]="Last Slide"></slider-image>
            </slider-item>
            <slider-item>
                <slider-image [image]="Copy First Slide"></slider-image>
            </slider-item>
        </sliderlist-horizontal>
    </slider>
    //Optional
    <banner>
        <banner-list>
            <banner-item>
                <banner-image [image]="First Slide-Banner"></banner-image>
            </banner-item>
            .
            .
            .
            <banner-item>
                <banner-image [image]="Last Slide-Banner"></banner-image>
            </banner-item>
        </banner-list>
    </banner>
</slider-angular>


```

