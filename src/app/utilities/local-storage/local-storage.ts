export class LocalStorage {
  setValueLocalStorage!: (key: string, object: object) => void;
  getValueLocalStorage!:<T>(key: string) => T | null;
}
