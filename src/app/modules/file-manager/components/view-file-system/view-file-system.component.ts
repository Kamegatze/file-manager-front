import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FileSystem} from "@file-manager/models/file-system";
import {GlobalClickService} from "@file-manager/services/global-click.service";
import {Subscription} from "rxjs";
import {FileManagerService} from "@file-manager/services/file-manager.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CreateFolderComponent} from "@file-manager/components/create-folder/create-folder.component";
import {
  ChangeNameFileSystemComponent
} from "@file-manager/components/change-name-file-system/change-name-file-system.component";
import {
  DeleteComponentFileSystemComponent
} from "@file-manager/components/delete-component-file-system/delete-component-file-system.component";

@Component({
  selector: 'app-view-file-system',
  templateUrl: './view-file-system.component.html',
  styleUrl: './view-file-system.component.scss'
})
export class ViewFileSystemComponent implements OnInit, OnDestroy {
  @Input() currentItems!: FileSystem[];
  @Input() path!: string;
  @Output() closeMainContextMenu = new EventEmitter<string>();
  @Output() doubleClickFileSystem = new EventEmitter<string>();
  @Output() overOnFileSystemEvent = new EventEmitter<boolean>();
  @Output() callContextMenuOnContextMenuComponent = new EventEmitter<boolean>()
  @ViewChild("contextMenu") contextMenu!: ElementRef;

  selectedIndex = -1;
  visibleContextMenu = 'hidden';
  x = 0;
  y = 0;
  clickOnFileSystem = false;
  subscriptions$: Subscription[] = [];
  downloadUrl!: SafeResourceUrl;
  nameDownloadFile!: string;
  private clickContext = false;

  constructor(
    private globalClickService: GlobalClickService,
    private fileManagerService: FileManagerService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    const subscribeListener = this.globalClickService.listener$.subscribe(() => {
      if (!this.clickContext) {
        this.visibleContextMenu = 'hidden';
      }
      if(this.selectedIndex >= 0 && !this.clickOnFileSystem) {
        this.selectedIndex = -1;
      }
      this.clickOnFileSystem = false;
      this.clickContext = false;
    });
    this.subscriptions$.push(subscribeListener);
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  /*
  * Метод для клика на файл или папку
  * */
  clickByFileSystem(i: number) {
    this.selectedIndex = i
    this.clickOnFileSystem = true;
  }

  /*
  * Переход к содержанию папки
  * */
  transitionToChildren(name: string) {
    this.doubleClickFileSystem.emit(name);
    this.overOnFileSystemEvent.emit(false);
  }

  /*
  * открытие контекстного меню на файлы или папки
  * */
  openContextMenuFileSystem(event: any, i: number) {
    event.preventDefault();
    this.generateUrlObject(i);
    const x = event['layerX'];
    const y = event['layerY'];
    const offsetX = this.contextMenu.nativeElement.firstChild.firstChild['offsetWidth'];
    if (x <= window.innerWidth - offsetX) {
      this.x = x;
      this.y = y;
      this.closeMainContextMenu.emit('hidden')
      this.visibleContextMenu = 'visible';
    } else {
      this.x = x - offsetX;
      this.y = y;
      this.closeMainContextMenu.emit('hidden')
      this.visibleContextMenu = 'visible';
    }
  }

  /*
  * Наведения на файлы или папки
  * */
  overOnFileSystem(event: boolean) {
    this.overOnFileSystemEvent.emit(event);
  }

  clickOnContext(event: boolean) {
    this.clickContext = event;
  }

  onContextMenuOnContextMenuComponent(event: boolean) {
    this.callContextMenuOnContextMenuComponent.emit(event);
  }

  generateUrlObject(i: number) {
    this.selectedIndex = i;
    const fileSystem = this.currentItems[this.selectedIndex];
    if (!fileSystem)  {
      return;
    }
    if (fileSystem.isFile) {
      const subscribe = this.fileManagerService.downloadFile(fileSystem.id!).subscribe(data => {
        this.nameDownloadFile = fileSystem.name!;
        this.downloadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
      });
      this.subscriptions$.push(subscribe);
      return;
    }
    const subscribe = this.fileManagerService.downloadFolder(fileSystem.id!).subscribe(data => {
      this.nameDownloadFile = `${fileSystem.name}.zip`;
      this.downloadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
    });
    this.subscriptions$.push(subscribe);
  }

  download() {
    this.visibleContextMenu = 'hidden';
  }

  openChangeModal() {
    this.visibleContextMenu = 'hidden';
    const fileSystem = this.currentItems[this.selectedIndex];
    const changeModal = this.modalService.open(ChangeNameFileSystemComponent,
      { ariaLabelledBy: 'modal-basic-title' });
    changeModal.componentInstance.modal = changeModal;
    changeModal.componentInstance.id = fileSystem.id;
    const subscribe = changeModal.componentInstance.changeNameEvent.subscribe((fileSystem: FileSystem)  => {
      const index = this.currentItems.findIndex(item => item.id === fileSystem.id);
      this.currentItems[index] = fileSystem;
    });
    this.subscriptions$.push(subscribe);
  }

  openDeleteModal() {
    this.visibleContextMenu = 'hidden';
    const fileSystem = this.currentItems[this.selectedIndex];
    const deleteModal = this.modalService.open(DeleteComponentFileSystemComponent,
      { ariaLabelledBy: 'modal-basic-title' });
    deleteModal.componentInstance.id = fileSystem.id;
    deleteModal.componentInstance.modal = deleteModal;
    deleteModal.componentInstance.deleteEvent.subscribe((id: string) => {
      const index = this.currentItems.findIndex(item => item.id === id);
      this.currentItems.splice(index, 1);
    })
  }
}
