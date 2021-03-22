import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SlideOptions } from '../../models/slide.options';

@Injectable({
  providedIn: 'root'
})
export class OptionsListener {

  private _slideOptionsSource:BehaviorSubject<SlideOptions>;
  private _slideOptions:Observable<SlideOptions>;

  constructor() {
    this._slideOptionsSource=new BehaviorSubject(null);
    this._slideOptions=this._slideOptionsSource.asObservable();
  }

  setSlideOptions(optionModel:SlideOptions){
    this._slideOptionsSource.next(optionModel);
  }

  getSlideOptions():Observable<SlideOptions>{
    return this._slideOptions;
  }
}
