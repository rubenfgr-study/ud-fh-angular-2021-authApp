import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.myForm.reset({
      email: 'test@test.com',
      password: '123456',
    });
  }

  login() {
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe(ok => {
      if (ok === true) {
        this.router.navigateByUrl('/protected');
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }
}
