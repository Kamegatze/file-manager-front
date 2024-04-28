import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FileSystem} from "@file-manager/models/file-system";
import {FileManagerService} from "@file-manager/services/file-manager.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent implements OnDestroy {
  modal!: NgbModalRef;
  parentId!: string;
  uploadFileEvent = new EventEmitter<FileSystem>();
  subscriptions$: Subscription[] = [];

  constructor(private fileManagerService: FileManagerService) {
  }

  ngOnDestroy() {
    this.subscriptions$
      .forEach(subscription => subscription.unsubscribe());
  }

  uploadFile(event: any) {
    const file: File = event.target[0].files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("parentId", this.parentId);
      const subscription = this.fileManagerService.uploadFile(formData).subscribe(fileSystem => {
        this.uploadFileEvent.emit(fileSystem);
        this.modal.close();
      });
      this.subscriptions$.push(subscription);
    }
  }
}
