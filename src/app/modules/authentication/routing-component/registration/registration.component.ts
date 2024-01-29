import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignUp} from "@authentication/models/sign-up";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {ResponseEntity} from "@root/models/response-entity";
import {Login} from "@authentication/models/login";
import {LocalStorageImp} from "@utilities/local-storage/imp/local-storage-imp";
import {Router} from "@angular/router";

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
    private authenticationService: AuthenticationService,
    private localStorageImp: LocalStorageImp,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.formRegistration = this.formBuilder.group({
      firstName: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]],
      lastName: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]],
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
    this.isViewRetryPassword = () => {
      return (this.formRegistration.get('password')?.value !== this.formRegistration.get('retryPassword')?.value
          && this.formRegistration.get('retryPassword')?.touched) ||
        (this.formRegistration.get('retryPassword')?.touched &&
          this.formRegistration.get('retryPassword')?.invalid);
    }
  }

  submit() {
    const signUp: SignUp = this.formRegistration.value;
    this.authenticationService.signup(signUp).subscribe({
      next: response => {
        if (response.returnCode >= 200 && response.returnCode <= 300) {
          this.authenticationService.signin(<Login>{login: signUp.login, password: signUp.password}).subscribe({
            next: jwtToken => {
              this.localStorageImp.setValueLocalStorage(this.authenticationService.getKeyJwtObject(), jwtToken);
              this.router.navigate(["/"]).then();
            }
          });
        }
      },
      error: err => {
        this.messageError = err
      }
    });
  }

}
