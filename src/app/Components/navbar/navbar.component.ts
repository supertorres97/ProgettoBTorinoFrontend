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

  private isBrowser(): boolean {
    return typeof localStorage !== 'undefined';
  }

  ngOnInit() {
    if (this.isBrowser()) {  // Controlla se siamo lato client
      this.isLoggedIn = this.auth.isAutentificated();
      const id = localStorage.getItem('idUtente');
      this.idUtente = id ? Number(id) : null;
    }
  }

  logout() {
    this.auth.setLogout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}