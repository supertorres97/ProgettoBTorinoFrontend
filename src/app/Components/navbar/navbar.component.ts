import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  idUtente: number | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Controlla se l'utente è loggato
    this.isLoggedIn = this.auth.isAutentificated();
    
    // Recupera idUtente (ad esempio da localStorage o da AuthService)
    this.idUtente = Number(localStorage.getItem("idUtente"));
  }

  logout() {
    this.auth.setLogout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}