import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {Login} from "@authentication/models/login";
import {LocalStorageImp} from "@utilities/local-storage/imp/local-storage-imp";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent implements OnInit{
  formLogin!: FormGroup;
  controlsName!: string[];
  messageError!: string;
  constructor(private formBuilder: FormBuilder,
              private authentication: AuthenticationService,
              private localStorage: LocalStorageImp) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
    this.controlsName = Object.keys(this.formLogin.controls);
  }

  submit(): void {
    const login: Login = this.formLogin.value;
    this.authentication.signin(login).subscribe({
      next: objectToken => {
        this.localStorage.setValueLocalStorage(this.authentication.getKeyJwtObject(), objectToken);
      },
      error: err => {
        console.error(err);
        this.messageError = err.message;
      },
      complete: () => {
        console.log("Http request completed");
      }
    });
  }
}
