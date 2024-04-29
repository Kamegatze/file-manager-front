import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FILE_MANAGER_API} from "@root/app.constant";
import {Observable} from "rxjs";
import {FileSystem} from "@file-manager/models/file-system";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private url = `${FILE_MANAGER_API}/api/file-system`;
  constructor(
    private http: HttpClient
  ) {}

  getRoot(): Observable<FileSystem> {
    return this.http.get<any>(`${this.url}/get-root`);
  }

  getChildren(parentId: string): Observable<FileSystem[]> {
    return this.http.get<FileSystem[]>(`${this.url}/children`, {params: {parentId}});
  }

  getFileSystemById(id: string): Observable<FileSystem> {
    return this.http.get<FileSystem>(`${this.url}/${id}`);
  }

  getChildrenByPath(path: string): Observable<FileSystem[]> {
    return this.http.get<FileSystem[]>(`${this.url}/children-by-path`, {params: {path}});
  }

  createFolder(fileSystem: FileSystem): Observable<FileSystem> {
    return this.http.post<FileSystem>(`${this.url}/create-folder`, fileSystem);
  }

  uploadFile(formData: FormData): Observable<FileSystem> {
    return this.http.post<FileSystem>(`${this.url}/create-file`, formData);
  }

  downloadFolder(id: string): Observable<Blob> {
    return this.http.get(`${this.url}/download-all-content-folder/${id}`, {responseType: 'blob'});
  }

  downloadFile(id: string): Observable<Blob> {
    return this.http.get(`${this.url}/download/${id}`, {responseType: 'blob'});
  }

  changeFileSystem(fileSystem: FileSystem): Observable<FileSystem> {
    return this.http.post<FileSystem>(`${this.url}/rename-file-system`, fileSystem);
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
