import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  idUtente: number | null = null;
  
  isAdmin = false;
  isSidebarOpen = false;

  constructor(private auth: AuthService, private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth >= 1200) {
      this.closeSidebar();
    }
  }

  ngOnInit() {
    this.updateUserStatus(); // Controlla lo stato iniziale
    this.isAdmin = this.auth.isRoleAdmin();
    // Ascolta i cambiamenti di rotta per aggiornare la navbar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserStatus();
        this.closeSidebar(); // Chiude la sidebar quando si cambia pagina
      }
    });
    const id = localStorage.getItem('idUtente');
    if (id && !isNaN(Number(id)) && Number(id) > 0) {
      this.isLoggedIn = true;
      this.idUtente = Number(id);
    }
  }

  updateUserStatus() {
    const id = localStorage.getItem('idUtente');
    this.isAdmin = this.auth.isRoleAdmin();
    if (id && !isNaN(Number(id)) && Number(id) > 0) {
      this.isLoggedIn = true;
      this.idUtente = Number(id);
    } else {
      this.isLoggedIn = false;
      this.idUtente = null;
    }
  }

  logout() {
    this.auth.setLogout();
    localStorage.removeItem('idUtente'); // Rimuove idUtente per evitare problemi
    this.isLoggedIn = false;
    this.idUtente = null;
    this.router.navigate(['/home']);
  }

}
