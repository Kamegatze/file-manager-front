import {Component, EventEmitter, OnInit} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, Validators} from "@angular/forms";
import {FileManagerService} from "@file-manager/services/file-manager.service";
import {FileSystem} from "@file-manager/models/file-system";

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrl: './create-folder.component.scss'
})
export class CreateFolderComponent implements OnInit {
  modal!: NgbModalRef;
  parentId!: string;
  createFolderEvent = new EventEmitter<FileSystem>();


  name = new FormControl("",
    [Validators.required, Validators.minLength(1)]);

  constructor(
    private fileManagerService: FileManagerService
  ) {
  }
  ngOnInit() {

  }

  createFolder() {
    const fileSystem: FileSystem = {
      name: this.name.value!,
      parentId: this.parentId
    }
    this.fileManagerService.createFolder(fileSystem).subscribe(fileSystem => {
      this.createFolderEvent.emit(fileSystem);
      this.modal.close();
    })
  }
}
