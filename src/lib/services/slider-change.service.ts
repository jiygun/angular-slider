import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderChangeService {

  private _activeSlideItemSource:BehaviorSubject<number>;
  private _activeSlide:Observable<number>;

  constructor() {
    this._activeSlideItemSource=new BehaviorSubject(1);
    this._activeSlide=this._activeSlideItemSource.asObservable();
  }

  setActiveSlide(activeSlide:number){
    this._activeSlideItemSource.next(activeSlide);
  }
  get activeSlide():Observable<number>{
    return this._activeSlide;
  }
}
