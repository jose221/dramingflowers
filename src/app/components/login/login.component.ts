import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error_messages = {
    email: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'La contraseña tiene bajos caracteres' },
      {
        type: 'maxLength',
        message: 'La contraseña a pasado el limite de los caracteres'
      },
      { type: 'pattern', message: 'Ingresa una contraseña valida, (Un numero, una mayuscula y una miniscula)' }
    ],
  };
  constructor(public formBuilder: FormBuilder,
    // tslint:disable-next-line:variable-name
              private _authService: AuthService,
              private router: Router) {
    this.loginForm = this.formBuilder.group(
      {
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ),
      },
    );
            }

  ngOnInit() {
  }

  tryLogin(value) {
    this.loading = true;
    this._authService.doLogin(value).then(
      data => {
        this.loading = false;
        this.router.navigateByUrl('/home');
      }, err => {
        this.loading = false;
        swal('Ojo', 'Usuario y/o contraseña incorrectos', 'warning');
        console.log(err);
      }).catch(
        err => {
          this.loading = false;
          swal('Ops!', 'Al parecer ocurrió un error, intenta más tarde', 'error');

        }
      );
}

}
