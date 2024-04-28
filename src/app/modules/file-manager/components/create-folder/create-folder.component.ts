import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, Validators} from "@angular/forms";
import {FileManagerService} from "@file-manager/services/file-manager.service";
import {FileSystem} from "@file-manager/models/file-system";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrl: './create-folder.component.scss'
})
export class CreateFolderComponent implements OnInit, OnDestroy {
  modal!: NgbModalRef;
  parentId!: string;
  createFolderEvent = new EventEmitter<FileSystem>();
  subscriptions$: Subscription[] = [];

  name = new FormControl("",
    [Validators.required, Validators.minLength(1)]);

  constructor(
    private fileManagerService: FileManagerService
  ) {
  }
  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  createFolder() {
    const fileSystem: FileSystem = {
      name: this.name.value!,
      parentId: this.parentId
    }
    const subscription = this.fileManagerService.createFolder(fileSystem).subscribe(fileSystem => {
      this.createFolderEvent.emit(fileSystem);
      this.modal.close();
    });
    this.subscriptions$.push(subscription);
  }
}
