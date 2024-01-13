import {LocalStorage} from "@utilities/local-storage/local-storage";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class LocalStorageImp implements LocalStorage{
  getValueLocalStorage<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item);
  }

  setValueLocalStorage(key: string, object: object): void {
    localStorage.setItem(key, JSON.stringify(object));
  }
}
