import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SlideChangeTypes } from '../../models/slide.model';

export interface SlideChangeModel{
  index:number;
  slideChangeType:SlideChangeTypes;
}

@Injectable({
  providedIn: 'root'
})
export class SlideListener {

  //public static instance: SlideChangeService=null;

  private _slideChangeSource:BehaviorSubject<SlideChangeModel>;
  private _slideChangeModel:Observable<SlideChangeModel>;

  constructor() {
    //SlideChangeService.instance = this;
    this._slideChangeSource=new BehaviorSubject(null);
    this._slideChangeModel=this._slideChangeSource.asObservable();
  }

  setSlideChangeModel(slideChangeModel:SlideChangeModel){
    this._slideChangeSource.next(slideChangeModel);
  }
  get slideChangeModel():Observable<SlideChangeModel>{
    return this._slideChangeModel;
  }
}
