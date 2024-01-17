import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit{
  formRegistration!: FormGroup;
  controlsName!: string[];
  messageError!: string;
  isViewRetryPassword!: Function;
  private EMAIL_PATTERN = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  constructor(
    private formBuilder: FormBuilder,
    ) {
  }

  ngOnInit(): void {
    this.formRegistration = this.formBuilder.group({
      login: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      email: ["", [
        Validators.required,
        Validators.email,
        Validators.pattern(this.EMAIL_PATTERN)
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
      ]],
      retryPassword: ["", [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
    this.controlsName = Object.keys(this.formRegistration.controls)
    console.log(this.formRegistration.get('password')?.value);
    this.isViewRetryPassword = () => {
      return (this.formRegistration.get('password')?.value !== this.formRegistration.get('retryPassword')?.value
          && this.formRegistration.get('retryPassword')?.touched) ||
        (this.formRegistration.get('retryPassword')?.touched &&
          this.formRegistration.get('retryPassword')?.invalid);
    }
  }

  submit() {

  }

}
