import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {Login} from "@authentication/models/login";
import {Router} from "@angular/router";
import {LocalStorage} from "@utilities/local-storage/local-storage";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent implements OnInit, OnDestroy {
  formLogin!: FormGroup;
  controlsName!: string[];
  messageError!: string;
  subscriptions$: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private authentication: AuthenticationService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: ["", [Validators.required]],
      credentials: ["", [Validators.required]]
    })
    this.controlsName = Object.keys(this.formLogin.controls);
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  submit(): void {
    const login: Login = this.formLogin.value;
    const subscription = this.authentication.signin(login).subscribe({
      next: objectToken => {
        this.messageError = undefined!;
        this.router.navigate(["/"]).then();
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = err.error.message;
      }
    });
    this.subscriptions$.push(subscription);
  }
}
