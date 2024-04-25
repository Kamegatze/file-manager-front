import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalClickService {
  private _clickEvent = new Subject<void>();
  private _listner$ = this._clickEvent.asObservable();
  constructor() { }

  get listner$() {
    return this._listner$;
  }

  click() {
    this._clickEvent.next();
  }

}
