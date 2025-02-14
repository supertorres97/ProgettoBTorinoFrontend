import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: false
})
export class SignInComponent implements OnInit {
  personalFormGroup!: FormGroup;
  credentialsFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.personalFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cFiscale: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      via: ['', Validators.required],
      cap: ['', Validators.required],
      citta: ['', Validators.required]
    });

    this.credentialsFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.personalFormGroup.valid && this.credentialsFormGroup.valid) {
      const utente = {
        nome: this.personalFormGroup.value.firstName,
        cognome: this.personalFormGroup.value.lastName,
        cFiscale: this.personalFormGroup.value.cFiscale,
        email: this.personalFormGroup.value.email,
        via: this.personalFormGroup.value.via,
        cap: this.personalFormGroup.value.cap,
        citta: this.personalFormGroup.value.citta
      };

      const credenziali = {
        username: this.credentialsFormGroup.value.username,
        password: this.credentialsFormGroup.value.password,
        attivo: true
      };

      this.userService.signup({ utente, credenziali }).subscribe(
        (resp: any) => {
          alert('Registrazione avvenuta con successo!');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Errore durante la registrazione:', error);
          alert('Errore durante la registrazione. Per favore riprova.');
        }
      );
    } else {
      alert('Per favore, compila tutti i campi richiesti.');
    }
  }
}
