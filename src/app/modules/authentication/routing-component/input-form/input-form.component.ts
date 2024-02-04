import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {Login} from "@authentication/models/login";
import {Router} from "@angular/router";
import {LocalStorage} from "@utilities/local-storage/local-storage";
import {HttpErrorResponse} from "@angular/common/http";

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
              private localStorage: LocalStorage,
              private router: Router
              ) {}

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
        this.messageError = undefined!;
        this.localStorage.setValueLocalStorage(this.authentication.getKeyJwtObject(), objectToken);
        this.router.navigate(["/"]).then();
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = err.error.message;
      }
    });
  }
}
