import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent implements OnInit{
  formLogin!: FormGroup;
  controlsName!: string[];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
    this.controlsName = Object.keys(this.formLogin.controls);
  }
}
