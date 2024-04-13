import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FILE_MANAGER_API} from "@root/app.constant";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private url = `${FILE_MANAGER_API}/api/file-system`;
  constructor(private http: HttpClient) { }

  getRoot(): Observable<any> {
    return this.http.get<any>(`${this.url}/get-root`);
  }

  getChildren(parentId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/children`, {params: {parentId}});
  }

  getFileSystmeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
