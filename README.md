# Slider-Angular
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
    <slider-angular [slideList]="objectList" [isSlideHorizontal]="true or false" (activeSlide)="activeSlide($event)" (clickedSlide)="clickedSlide($event)"></slider-angular>
```

Objects

- Your object list must be equal or higher than two.

Only With Images

```hs
    objectList=[{
      imagePath:"Your image path"
    },];
```
With Parameters

```hs
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