import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "@root/components/modal/modal.component";
import {response} from "express";
import {ResponseEntity} from "@root/models/response-entity";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: "app-page-request-change-password",
  templateUrl: "./page-request-change-password.component.html",
  styleUrl: "./page-request-change-password.component.scss"
})
export class PageRequestChangePasswordComponent implements OnInit {
  formRequest!: FormGroup;
  controlsName!: string[];
  errorMessage!: string;
  isOpen: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private modal: NgbModal
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
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
      },
      next: (response: ResponseEntity) => {
        this.errorMessage = undefined!
        const modalRef = this.modal.open(ModalComponent);
        modalRef.componentInstance.message = response.message;
      }
    });
  }
}
