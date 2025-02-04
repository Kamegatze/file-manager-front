import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileManagerService} from "@file-manager/services/file-manager.service";
import { ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {FileSystem} from "@file-manager/models/file-system";
import {GlobalClickService} from "@file-manager/services/global-click.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CreateFolderComponent} from "@file-manager/components/create-folder/create-folder.component";
import {UploadFileComponent} from "@file-manager/components/upload-file/upload-file.component";
import {ViewFileSystemComponent} from "@file-manager/components/view-file-system/view-file-system.component";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild('contextMenu')
  menuContext!: ElementRef;
  @ViewChild(ViewFileSystemComponent)
  viewFileSystemComponent!: ViewFileSystemComponent;

  currentItems!: FileSystem[];
  path!: string;
  pathArray: string[] = [];
  visibleContextMenu = 'hidden';
  x = 0;
  y = 0;
  isClickContext = false;
  overOnFileSystem = false;
  subscriptions$: Subscription[] = [];
  private contextMenuOnContextMenuComponent = false;

  constructor(
    private fileManagerService: FileManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private globalClickService: GlobalClickService,
    private modalService: NgbModal,
  )
  {}
  ngOnInit(): void {
    /*
    * Получения пути из url браузера
    * */
    const url = decodeURI(this.route.snapshot.queryParams["path"]);
    if (!url.length || url === 'undefined') {
      this.path = "/"
      if (url === 'undefined') {
        this.router.navigate([], {queryParams: {path: this.path}});
      } 
    } else {
      this.path = url 
    }
    /*
    * Получения всех елементов по пути на каждом уровни
    * */
    const subscribeChildrenByPath = this.fileManagerService.getChildrenByPath(this.path).subscribe(children => {
      this.currentItems = children;
    });
    this.subscriptions$.push(subscribeChildrenByPath);
    /*
    * Слушатель событият клика на главный компонент для закрытия контехтного мекню
    * */
    const subscribeListener = this.globalClickService.listener$.subscribe(() => {
      if (!this.isClickContext) {
        this.visibleContextMenu = 'hidden';
      }
      this.isClickContext = false;
    });
    this.pathArray = this.path.split("/").filter(item => item.length);
    this.subscriptions$.push(subscribeListener);
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  /*
  * переход в следующию папки при некоторм событии
  * */
  transitionToChildren(name: string): void {
    const path = this.path === '/' ? `${this.path}${name}` :`${this.path}/${name}`
    const subscribe = this.fileManagerService.getChildrenByPath(path).subscribe(children => {
      this.currentItems = children;
      this.router.navigate([], {queryParams: {path}});
      this.path = path
      this.pathArray = this.path.split("/").filter(item => item.length);
    });
    this.subscriptions$.push(subscribe);
  }

  /*
  * переход назад в файловой системе
  * */
  transitionBack(index: number): void {
    if (this.path === "/") {
      return;
    }
    const pathArray = this.path.split("/").slice(0, index);
    const path = pathArray.length > 1 ? pathArray.join("/") : "/";
    const subscribe = this.fileManagerService.getChildrenByPath(path).subscribe(children => {
      this.currentItems = children;
      this.path = path;
      this.pathArray = this.path.split("/").filter(item => item.length);
      this.router.navigate([], {queryParams: {path}});
    });
    this.subscriptions$.push(subscribe);
  }

  /*
  * переход по breadcrumb по клику
  * */
  breadcrumbClick(index: number): void {
    if (this.path === '/') {
      return;
    }
    const pathArray = this.path.split("/").slice(0, index + 1);
    const path = pathArray.length > 1 ? pathArray.join("/") : "/";
    if (path === this.path) {
      return;
    }
    const subscribe = this.fileManagerService.getChildrenByPath(path).subscribe(children => {
      this.currentItems = children;
      this.path = path;
      this.pathArray = this.path.split("/").filter(item => item.length);
      this.router.navigate([], {queryParams: {path}});
    });
    this.subscriptions$.push(subscribe);
  }

  /*
  * Закрытие главного контехного меню в дочернем элементе
  * */
  closeMainContextMenu(event: string) {
    this.visibleContextMenu = 'hidden';
  }


  /*
  * Открытие главного контекстного меню
  * */
  openContextMenu(event: any) {
    event.preventDefault();
    if (this.overOnFileSystem || this.contextMenuOnContextMenuComponent) {
      return;
    }
    const offsetX = this.menuContext.nativeElement.firstChild.firstChild['offsetWidth'];
    const x: number = event['layerX'];
    const y: number = event['layerY'];
    if (x <= window.innerWidth - offsetX) {
      this.x = x;
      this.y = y;
      this.viewFileSystemComponent.visibleContextMenu = 'hidden';
      this.visibleContextMenu = 'visible';
    } else {
      this.x = x - offsetX;
      this.y = y;
      this.viewFileSystemComponent.visibleContextMenu = 'hidden';
      this.visibleContextMenu = 'visible';
    }
  }


  /*
  * Переход к прошлому или будущему по стрелочкам браузера,
  * так как по роут пути не работает, url меняется, а контент нет, так как
  * не понятно как настроить роуты для файловой системе, один из вариантов
  * указывать путь по которму находится пользователь через query param или вместо сепоратора '/'
  * использовать '.' или любой другой
  * */
  @HostListener("window:popstate")
  updateCurrentItems(): void {
    const subscribe = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = decodeURI(this.route.snapshot.queryParams["path"]);
        if (!url.length || url === 'undefined') {
          this.path = "/"
        } else {
          this.path = url 
        }
        this.fileManagerService.getChildrenByPath(this.path).subscribe(children => {
          this.currentItems = children;
        });
      }
      this.pathArray = this.path.split("/").filter(item => item.length);
    });
    this.subscriptions$.push(subscribe);
  }

  /*
  * проверка клика на контехтного меню
  * что бы не закрывался
  * */
  clickContext(event: boolean) {
    this.isClickContext = event;
  }

  /*
  * проверка наведена мышка на файловый элемент или нет
  * что бы не открывался главный контекстного меню
  * */
  setOverOnFileSystem(event: boolean) {
    this.overOnFileSystem = event;
  }

  /*
  * Открытие модального окна для создания папки
  * */
  openCreateFolder() {
    const createFolderModal = this.modalService.open(CreateFolderComponent, { ariaLabelledBy: 'modal-basic-title' });
    createFolderModal.componentInstance.modal = createFolderModal;
    const subscribe = createFolderModal.componentInstance.createFolderEvent.subscribe((fileSystem: FileSystem) => {
      this.currentItems = [...this.currentItems, fileSystem];
    })
    this.visibleContextMenu = 'hidden';
    this.isClickContext = false;
    this.setParentId(createFolderModal);
    this.subscriptions$.push(subscribe);
  }

  /*
  * Открытие модального окна для загрузки файлов
  * */
  openUploadFile() {
    const uploadFileModal = this.modalService.open(UploadFileComponent, { ariaLabelledBy: 'modal-basic-title' });
    uploadFileModal.componentInstance.modal = uploadFileModal;
    const subscribe = uploadFileModal.componentInstance.uploadFileEvent.subscribe((fileSystem: FileSystem) => {
      this.currentItems = [...this.currentItems, fileSystem];
    });
    this.visibleContextMenu = 'hidden';
    this.isClickContext = false;
    this.setParentId(uploadFileModal);
    this.subscriptions$.push(subscribe);
  }

  /*
  * Установка родительского id
  * в модальном окне
  * */
  private setParentId(modal: NgbModalRef) {
    if (this.currentItems.length) {
      modal.componentInstance.parentId = this.currentItems[0].parentId;
    } else if (this.path === '/') {
      const subscribe = this.fileManagerService.getRoot().subscribe(fileSystem => {
        modal.componentInstance.parentId = fileSystem.id;
      });
      this.subscriptions$.push(subscribe);
    } else {
      const path = this.path.split("/");
      const subscribe = this.fileManagerService.getChildrenByPath(`/${path.slice(1, path.length - 1).join("/")}`).subscribe(items => {
        const fileSystem = items.find(element => element.name === path[path.length - 1]);
        modal.componentInstance.parentId = fileSystem?.id;
      });
      this.subscriptions$.push(subscribe);
    }
  }

  setContextMenuOnContextMenuComponent(event: boolean) {
    this.contextMenuOnContextMenuComponent = event;
  }
}
