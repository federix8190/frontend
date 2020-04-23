import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {Mensajes} from '../commons/mensajes';
import {RestService} from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    showPass: any = false;
    showMessage: any = false;
    loginMessage: string = '';
    loginForm: FormGroup;
    validUsername: any = false;
    validPassword: any = false;
    disabledButton: any = false;

    constructor(private fb: FormBuilder, 
          private service: RestService,
          private mensaje: Mensajes,
          public router: Router) {

        this.crearControles();
    }

    ngOnInit() {
        $('#menu_general').hide();
    }

    crearControles() {
      this.loginForm = this.fb.group( {
        username: [null, Validators.required],
        password: [null, Validators.required],
      });
    }

    resetPassword() {
      this.router.navigate(['/recuperar-password']);
    }

    toggleShowPass() {
      if (this.showPass) {
        this.showPass = false;
      } else {
        this.showPass = true;
      }
    }

    valid() {
      this.validUsername = this.loginForm.controls['username'].valid;
      this.validPassword = this.loginForm.controls['password'].valid;
    }

    login() {
        this.valid();
        this.disabledButton = true;
        this.loginForm.disable();
        if (this.validUsername && this.validPassword) {
            var username = this.loginForm.controls['username'].value;
            var password = this.loginForm.controls['password'].value;
            this.service.login(username, password, true)
            .subscribe(response => {
                console.log('Response : ', response);
                if (response.exitoso!) {
                    this.router.navigate(['/']);
                } else {
                    console.log('Error login');
                }
            }, error => {
                this.loginForm.enable();
                this.disabledButton = false;
                this.showMessage = true;
                this.loginMessage = 'Usuario y/o contraseña es incorrecta!'
                this.mensaje.error("Autenticación fallida", this.loginMessage);
            }, () => {
                this.loginForm.enable();
                this.disabledButton = false;
            });
        } else {
            this.showMessage = true;
            this.loginMessage = 'Usuario y/o contraseña invalidas!'
        }
    }

}
