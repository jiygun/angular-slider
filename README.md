
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

slideResponsiveModel:SlideResponsiveModel[]=[
	{breakPoint:max,items:max},
	.
	.
	.
	{breakPoint:min,items:min}
]

slideOptions:SlideOptions={
	loop: boolean;
	items: number; -> The value here should be the same as the maksimum number of the items in the 	responsive model.
	margin: number;
	duration: number;
	timer: number; -> İf loop was false this wouldn't  work.
	responsive: slideResponsiveModel; 
}

*If the number of slides shown was greater than 1, the banner part wouldn't work.

```hs

  

<slider-angular>

<slider>

<sliderlist-horizontal [slideOptions]="slideOptions">
<slide-prev></slide-prev>

<slide-next></slide-next>

<slider-item //*ngFor="let  yourSlide  of  yourSlideList" >
.
.
.
</slider-item>

</sliderlist-horizontal>

</slider>

//Optional

<banner>

<banner-list>
.
.
<banner-item>
.
.
.
</banner-item>
<banner-item>
.
.
.
</banner-item>
.
.
</banner-list>

</banner>

</slider-angular>

  
  

```
