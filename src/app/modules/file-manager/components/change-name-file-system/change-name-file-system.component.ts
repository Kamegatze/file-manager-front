import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FileSystem} from "@file-manager/models/file-system";
import {Subscription} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {FileManagerService} from "@file-manager/services/file-manager.service";

@Component({
  selector: 'app-change-name-file-system',
  templateUrl: './change-name-file-system.component.html',
  styleUrl: './change-name-file-system.component.scss'
})
export class ChangeNameFileSystemComponent implements OnDestroy{
  modal!: NgbModalRef;
  id!: string;
  changeNameEvent = new EventEmitter<FileSystem>();
  subscriptions$: Subscription[] = [];
  name = new FormControl("",
    [Validators.required, Validators.minLength(1)]);

  constructor(
    private fileMangerService: FileManagerService
  ) {}

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  changeName() {
    const subscribe = this.fileMangerService.changeFileSystem({id: this.id, name: this.name.value!})
      .subscribe(fileSystem => {
        this.changeNameEvent.emit(fileSystem);
        this.modal.close();
      });
    this.subscriptions$.push(subscribe);
  }
}
