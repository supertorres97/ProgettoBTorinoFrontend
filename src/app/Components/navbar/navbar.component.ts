import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

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
    if (this.isBrowser()) {
      this.updateUserStatus(); // Controlla lo stato iniziale

      // Ascolta quando l'utente naviga in un'altra pagina e aggiorna lo stato
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateUserStatus();
        }
      });
    }  
  }

  updateUserStatus() {
    this.isLoggedIn = this.auth.isAutentificated();
    const id = localStorage.getItem('idUtente');
    this.idUtente = id ? Number(id) : null;
  }

  logout() {
    this.auth.setLogout();
    this.updateUserStatus(); // Aggiorna la navbar subito dopo il logout
    this.router.navigate(['/home']);
  }
}