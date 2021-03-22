import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerActiveListener {

  private _bannerActiveSource: BehaviorSubject<number>;
  private _bannerActive: Observable<number>;

  constructor() {
    this._bannerActiveSource = new BehaviorSubject(0);
    this._bannerActive = this._bannerActiveSource.asObservable();
  }

  setActiveBanner(bannerLimit: number) {
    this._bannerActiveSource.next(bannerLimit);
  }
  get activeBanner(): Observable<number> {
    return this._bannerActive;
  }
}
