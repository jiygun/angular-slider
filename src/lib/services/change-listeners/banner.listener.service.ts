import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerListener {

  private _bannerSource: BehaviorSubject<number>;
  private _bannerLimit: Observable<number>;

  constructor() {
    this._bannerSource = new BehaviorSubject(0);
    this._bannerLimit = this._bannerSource.asObservable();
  }

  setBannerLimit(bannerLimit: number) {
    this._bannerSource.next(bannerLimit);
  }
  get slideBannerLimit(): Observable<number> {
    return this._bannerLimit;
  }
}
