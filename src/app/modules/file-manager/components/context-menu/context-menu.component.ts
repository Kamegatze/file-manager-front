import {Component, EventEmitter, input, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent implements OnInit {

  @Input() visible!: string;
  @Input() x!: number;
  @Input() y!: number;
  @Output() clickContext = new EventEmitter<boolean>();
  ngOnInit(): void {

  }
}
