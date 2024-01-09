import {LocalStorage} from "@utilities/local-storage/local-storage";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class LocalStorageImp implements LocalStorage{
  getValueLocalStorage<T>(key: string): T {
    return JSON.parse(<any>localStorage.getItem(key));
  }

  setValueLocalStorage(key: string, object: object): void {
    localStorage.setItem(key, JSON.stringify(object));
  }
}
