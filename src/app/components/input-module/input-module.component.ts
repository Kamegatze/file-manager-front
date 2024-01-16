import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-module',
  templateUrl: './input-module.component.html',
  styleUrl: './input-module.component.scss'
})
export class InputModuleComponent implements OnInit{
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type!: string;
  @Input() formGroup!: FormGroup;
  @Input() messageError!: string;
  @Input() isViewMessageError: Function = () => {
    return this.formGroup.get(this.controlName)?.touched &&
    this.formGroup.get(this.controlName)?.invalid;
  };

  ngOnInit(): void {
  }
}
