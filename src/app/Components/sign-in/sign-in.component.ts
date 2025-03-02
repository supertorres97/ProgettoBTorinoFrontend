import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CredenzialiService } from '../../services/credenziali.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: false
})
export class SignInComponent implements OnInit {
  personalFormGroup!: FormGroup;
  credentialsFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,
    private credService: CredenzialiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.authService.isAuthentificated())
      this.authService.isLoggedIn = true;
    else this.authService.isLoggedIn = false;
    this.personalFormGroup = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      cFiscale: [''],
      via: ['', Validators.required],
      cap: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      citta: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.credentialsFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
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
      const utenteReq = {
        nome: this.personalFormGroup.value.nome,
        cognome: this.personalFormGroup.value.cognome,
        cFiscale: this.personalFormGroup.value.cFiscale,
        email: this.personalFormGroup.value.email,
        via: this.personalFormGroup.value.via,
        cap: this.personalFormGroup.value.cap,
        citta: this.personalFormGroup.value.citta
      };

      const credenzialiReq = {
        username: this.credentialsFormGroup.value.username,
        password: this.credentialsFormGroup.value.password,
        attivo: true
      };

      const signupObject = { utenteReq, credenzialiReq };
      this.credService.signup(signupObject).subscribe({
        next: (resp: any) => {
          console.log('Inserimento riuscito:', resp);
          this.showMessage('Registrazione avvenuta con successo!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Errore durante la registrazione:', error);
          this.showMessage('Errore durante la registrazione. Per favore riprova.');
        },
        complete: () => {
          console.log('Richiesta completata con successo!');
        }
      });
    } else {
      this.showMessage('Per favore, compila tutti i campi richiesti.');
    }
  }

  private showMessage(message: string): void {
    this._snackBar.open(message, 'Chiudi', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
    });
  }
}
