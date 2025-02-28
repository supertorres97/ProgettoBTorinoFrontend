import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CredenzialiService } from '../../services/credenziali.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  logged: boolean = false;
  errorMessage: string = ''; 

  constructor(
    private cred: CredenzialiService,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object // Aggiungi questa iniezione
  ) { }

  ngOnInit(): void {
    this.auth.setAutentificated();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.valid) {
      this.cred.signin({
        username: this.loginForm.value.username,
        pwd: this.loginForm.value.password  
      }).subscribe(
        (resp: any) => {
          console.log('Risposta dal backend:', resp);

          if (resp.logged) {
            this.auth.setAutentificated();
            if (resp.idUtente !== null && resp.idUtente !== undefined) {
              this.auth.setIdUtente(resp.idUtente);
              
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem("idUtente", resp.idUtente.toString());
              }

              if (resp.ruolo.descrizione === "ADMIN") {
                console.log("sono un admin", resp.role?.descrizione);
                this.auth.setAdmin();
              } else {
                this.auth.setUser();
                console.log("sono uno user", resp.role?.descrizione);
              }

              this.router.navigate(["/home"]);
            } else {
              this.showMessage("Errore: impossibile ottenere l'ID utente.");
            }
          } else {
            this.showMessage("Si è verificato un errore durante il login. Riprova.");
          }
        },
        (error: any) => {
          console.error('Errore durante il login:', error);
          this.errorMessage = "Credenziali non valide.";
        }
      );
    } else {
      this.errorMessage = "Per favore, compila tutti i campi.";
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
