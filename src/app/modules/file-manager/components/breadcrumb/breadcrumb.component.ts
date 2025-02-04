import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() path!: string;
  @Input() pathArray: string[] = []
  @Output() backClick = new EventEmitter<any>()
  @Output() breadcrumbClick = new EventEmitter<any>();
}
