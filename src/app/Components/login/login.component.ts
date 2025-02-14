import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

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
  errorMessage: string = ''; // ✅ Variabile per il messaggio di errore

  constructor(
    private usr: UserService,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.setAutentificated();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = ''; // ✅ Reset del messaggio di errore prima di ogni login

    if (this.loginForm.valid) {
      this.usr.signin({
        username: this.loginForm.value.username,
        pwd: this.loginForm.value.password
      }).subscribe(
        (resp: any) => {
          console.log('Risposta dal backend:', resp);

          if (resp.logged) {
            this.auth.setAutentificated();
            if (resp.idUtente !== null && resp.idUtente !== undefined) {
              this.auth.setIdUtente(resp.idUtente);
              localStorage.setItem("idUtente", resp.idUtente.toString());

              if (resp.role === "ADMIN") {
                this.auth.setAdmin();
              } else {
                this.auth.setUser();
              }

              this.router.navigate(["/profile", resp.idUtente]);
            } else {
              this.errorMessage = "Errore: impossibile ottenere l'ID utente.";
            }
          } else {
            this.errorMessage = "Credenziali non valide.";
          }
        },
        (error: any) => {
          console.error('Errore durante il login:', error);
          this.errorMessage = "Si è verificato un errore durante il login. Riprova.";
        }
      );
    } else {
      this.errorMessage = "Per favore, compila tutti i campi.";
    }
  }
}
