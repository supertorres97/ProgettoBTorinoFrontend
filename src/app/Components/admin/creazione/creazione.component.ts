import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creazione',
  standalone: false,
  
  templateUrl: './creazione.component.html',
  styleUrl: './creazione.component.css'
})
export class CreazioneComponent {
  personalFormGroup!: FormGroup;
  credentialsFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private utenteS:UserService,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if(this.authService.isAuthentificated())
      this.authService.isLoggedIn = true;
    else this.authService.isLoggedIn = false;
    this.personalFormGroup = this.fb.group({
      nome: ['', Validators.required], // Aggiungi questo controllo
      cognome: ['', Validators.required],  // Aggiungi questo controllo
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

      const signupObject = {utenteReq, credenzialiReq};
      this.utenteS.createAdmin(signupObject).subscribe({
        next: (resp: any) => {
          console.log('Inserimento riuscito:', resp);
          this.showMessage('Registrazione avvenuta con successo!');
          window.location.reload();
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
      verticalPosition: 'bottom', // Mantiene la posizione in basso
      horizontalPosition: 'end', // Sposta a destra
    });
  }
}
