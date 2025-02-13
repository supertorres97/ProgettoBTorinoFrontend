import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, delay } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: false,

  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  personalFormGroup!: FormGroup;
  credentialsFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.personalFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.credentialsFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.personalFormGroup.valid && this.credentialsFormGroup.valid) {
      const formData = { ...this.personalFormGroup.value, ...this.credentialsFormGroup.value };
      console.log('Dati del form:', formData);

      of(formData)
        .pipe(delay(2000))
        .subscribe(response => {
          console.log('Risposta mock:', response);
          alert('Registrazione effettuata (mock): ' + JSON.stringify(response));

          this.authService.login();
          this.router.navigate(['/home']);
        });
    } else {
      alert('Per favore, compila tutti i campi richiesti.');
    }
  }
}
