import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FileSystem} from "@file-manager/models/file-system";
import {GlobalClickService} from "@file-manager/services/global-click.service";
import {Subscription} from "rxjs";

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
  @ViewChild("contextMenu") contextMenu!: ElementRef;

  selectedIndex = -1;
  visibleContextMenu = 'hidden';
  x = 0;
  y = 0;
  clickOnFileSystem = false;
  subscriptions$: Subscription[] = [];

  constructor(private globalClickService: GlobalClickService) {
  }

  ngOnInit() {
    const subscribeListener = this.globalClickService.listener$.subscribe(() => {
      this.visibleContextMenu = 'hidden';
      if(this.selectedIndex >= 0 && !this.clickOnFileSystem) {
        this.selectedIndex = -1;
      }
      this.clickOnFileSystem = false;
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
  }

  /*
  * ткрытие контекстного меню на файлы или папки
  * */
  openContextMenuFileSystem(event: any) {
    event.preventDefault();
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
}
