import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalClickService {
  private _clickEvent = new Subject<void>();
  private _listener$ = this._clickEvent.asObservable();
  constructor() { }

  get listener$() {
    return this._listener$;
  }

  click() {
    this._clickEvent.next();
  }

}
