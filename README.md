
# Slider-Angular

  

![](https://media.giphy.com/media/gf6Zn6hyMKwT93cc3u/giphy.gif)

  

![](https://media.giphy.com/media/MAWiiAke5YvbWHA5oR/giphy.gif)

  

  

# Usage

  

  

```hs

  

npm install slider-angular

  

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

Note:

* The nav design has been deleted. It is fixed to absolute left and right only. Create your own design.
* You can use the "active" class in the banner section. There is no design for active class.

slideResponsiveModel:SlideResponsiveModel[]=[
	{breakPoint:max,items:max},
	.
	.
	.
	{breakPoint:min,items:min}
]

slideOptions:SlideOptions={
	loop: boolean;
	items: number; -> The value here should be the same as the maximum number of the items in the 	responsive model.
	margin: number;
	duration: number; 400-600 recommended
	timer: number; -> İf loop was false this wouldn't  work.
	responsive: slideResponsiveModel; 
  banner: boolean;
}

example;

slideOptions={
  loop:true,
  items:4,
  margin:20,
  duration:600,
  timer:3000,
  banner:true,
  responsive:[
    {breakPoint:1200,items:4},
    {breakPoint:900,items:3},
    {breakPoint:0,items:2}
  ]
};
  

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

<banner></banner>

</slider-angular>

  
  

```
