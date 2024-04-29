import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FileSystem} from "@file-manager/models/file-system";
import {Subscription} from "rxjs";
import {FileManagerService} from "@file-manager/services/file-manager.service";

@Component({
  selector: 'app-delete-component-file-system',
  templateUrl: './delete-component-file-system.component.html',
  styleUrl: './delete-component-file-system.component.scss'
})
export class DeleteComponentFileSystemComponent implements OnDestroy {
  modal!: NgbModalRef;
  id!: string;
  deleteEvent = new EventEmitter<string>();
  subscriptions$: Subscription[] = [];

  constructor(private fileManageService: FileManagerService) {
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  delete() {
    this.fileManageService.deleteById(this.id).subscribe(() => {
      this.deleteEvent.emit(this.id);
      this.modal.close();
    })
  }
}
