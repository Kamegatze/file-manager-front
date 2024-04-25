import { Component, HostListener, OnInit} from '@angular/core';
import {FileManagerService} from "@file-manager/services/file-manager.service";
import { NavigationEnd, Router} from "@angular/router";
import {FileSystem} from "@file-manager/models/file-system";
import {GlobalClickService} from "@file-manager/services/global-click.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateFolderComponent} from "@file-manager/components/create-folder/create-folder.component";
import {UploadFileComponent} from "@file-manager/components/upload-file/upload-file.component";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit{

  folderUrl!: string;
  arrowBack!: string;
  currentItems!: FileSystem[];
  path!: string;
  visibleContextMenu = 'hidden';
  x = 0;
  y = 0;
  isClickContext = false;
  constructor(
    private fileManagerService: FileManagerService,
    private router: Router,
    private globalClickService: GlobalClickService,
    private modalService: NgbModal,
  )
  {}
  ngOnInit(): void {
    const url = this.router.url.split("/").filter(item => item.length).join("/");
    if (!url.length) {
      this.path = "root"
    } else {
      this.path = `root/${url}`
    }
    this.fileManagerService.getChildrenByPath(this.path).subscribe(children => {
      this.currentItems = children;
    });
    this.globalClickService.listner$.subscribe(() => {
      if (!this.isClickContext) {
        this.visibleContextMenu = 'hidden';
      }
      this.isClickContext = false;
    });
  }

    private base64ToBlob(base64: string): Blob {
      const type = base64.split(';')[0].split(':')[1];
      const base64Data = base64.split(',')[1];
      const decodeData = atob(base64Data);
      const arrayBuffer = new Uint8Array(decodeData.length);
      for (let i = 0; i < decodeData.length; i++) {
        arrayBuffer[i] = decodeData.charCodeAt(i);
      }
      return new Blob([arrayBuffer], {type});
    }

  transitionToChildren(name: string): void {
    const path = `${this.path}/${name}`
    this.fileManagerService.getChildrenByPath(path).subscribe(children => {
      this.currentItems = children;
      this.router.navigate([path.split("/").slice(1).join("/")]);
      this.path = path
    });
  }

  transitionBack(index: number): void {
    if (this.path.split("/").length === 1) {
      return;
    }
    const path = this.path.split("/").slice(0, index - 1).join("/");
    const pathRedirect = this.path.split("/").slice(1, index - 1).join("/");
    this.fileManagerService.getChildrenByPath(path).subscribe(children => {
      this.currentItems = children;
      this.path = path;
      this.router.navigate([`/${pathRedirect}`]);
    })
  }
  breadcrumbClick(index: number): void {
    if (this.path.split("/").length === 1) {
      return;
    }
    const path = this.path.split("/").slice(1, index + 1).join("/")
    const pathRequest = this.path.split("/").slice(0, index + 1).join("/");
    this.fileManagerService.getChildrenByPath(pathRequest).subscribe(children => {
      this.currentItems = children;
      this.path = pathRequest;
      this.router.navigate([`/${path}`]);
    });
  }

  openContextMenu(event: any) {
    event.preventDefault();
    this.x = event['clientX'];
    this.y = event['clientY'];
    this.visibleContextMenu = 'visible';
  }

  @HostListener("window:popstate")
  updateCurrentItems(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url.split("/").filter(item => item.length).join("/");
        if (!url.length) {
          this.path = "root"
        } else {
          this.path = `root/${url}`
        }
        this.fileManagerService.getChildrenByPath(this.path).subscribe(children => {
          this.currentItems = children;
        });
      }
    });
  }

  clickContext($event: boolean) {
    this.isClickContext = $event;
  }

  openCreateFolder() {
    const createFolderModal = this.modalService.open(CreateFolderComponent, { ariaLabelledBy: 'modal-basic-title' });
    createFolderModal.componentInstance.modal = createFolderModal;
    createFolderModal.componentInstance.createFolderEvent.subscribe((fileSystem: FileSystem) => {
      this.currentItems = [...this.currentItems, fileSystem];
    })
    this.visibleContextMenu = 'hidden';
    this.isClickContext = false;
    if (this.currentItems.length) {
      createFolderModal.componentInstance.parentId = this.currentItems[0].parentId;
    } else if (this.path === 'root') {
      this.fileManagerService.getRoot().subscribe(fileSystem => {
        createFolderModal.componentInstance.parentId = fileSystem.id;
      });
    } else {
      const path = this.path.split("/");
      this.fileManagerService.getChildrenByPath(path.slice(0, path.length - 1).join("/")).subscribe(items => {
        const fileSystem = items.find(element => element.name === path[path.length - 1]);
        createFolderModal.componentInstance.parentId = fileSystem?.id;
      });
    }
  }

  openUploadFile() {
    const uploadFileModal = this.modalService.open(UploadFileComponent, { ariaLabelledBy: 'modal-basic-title' });
    uploadFileModal.componentInstance.modal = uploadFileModal;
    uploadFileModal.componentInstance.uploadFileEvent.subscribe((fileSystem: FileSystem) => {
      this.currentItems = [...this.currentItems, fileSystem];
    });
    this.visibleContextMenu = 'hidden';
    this.isClickContext = false;
    if (this.currentItems.length) {
      uploadFileModal.componentInstance.parentId = this.currentItems[0].parentId;
    }
  }
}
