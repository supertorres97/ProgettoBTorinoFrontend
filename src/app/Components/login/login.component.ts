import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { of, delay } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup= new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Inizializza il form con due controlli: username e password
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // Verifica che il form sia valido
    if (this.loginForm.valid) {
      console.log('Dati del form:', this.loginForm.value);

      // Simula una chiamata al backend con un ritardo di 2 secondi
      of(this.loginForm.value)
        .pipe(delay(2000))
        .subscribe(response => {
          console.log('Risposta mock:', response);
          // Qui puoi gestire la risposta del "backend"
          alert('Login effettuato (mock): ' + JSON.stringify(response));

          // Imposta il login a true
          this.authService.login();

          // Reindirizza l'utente alla home
          this.router.navigate(['/home']);
        });
    } else {
      alert('Per favore, compila tutti i campi richiesti.');
    }
  }
}  