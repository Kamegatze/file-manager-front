import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileSystem} from "@file-manager/models/file-system";
import {FileManagerService} from "@file-manager/services/file-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-file-system',
  templateUrl: './view-file-system.component.html',
  styleUrl: './view-file-system.component.scss'
})
export class ViewFileSystemComponent {
  @Input() currentItems!: FileSystem[];
  selectedIndex = -1;
  @Input() path!: string;
  @Output() doubleClickFileSystem = new EventEmitter<string>();
  constructor(private fileManagerService: FileManagerService,
              private router: Router,) {
  }

  clickByFileSystem(i: number) {
    this.selectedIndex = i
  }

  transitionToChildren(name: string) {
    this.doubleClickFileSystem.emit(name);
  }
}
