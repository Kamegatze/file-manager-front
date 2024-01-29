import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {response} from "express";

@Component({
  selector: "app-page-request-change-password",
  templateUrl: "./page-request-change-password.component.html",
  styleUrl: "./page-request-change-password.component.scss"
})
export class PageRequestChangePasswordComponent implements OnInit {
  formRequest!: FormGroup;
  controlsName!: string[];
  errorMessage!: string;
  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.formRequest = this.formBuilder.group({
      loginOrEmail: ["", [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
    this.controlsName = Object.keys(this.formRequest.controls);
  }

  submit() {
    const loginOrEmail: string = this.formRequest.value.loginOrEmail;
    this.authentication.sendLinkOnEmailForChangePassword(loginOrEmail).subscribe({
      error: err => {
        this.errorMessage = err;
      }
    });
  }
}
