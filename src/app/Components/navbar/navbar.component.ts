import { Component, OnInit } from '@angular/core';
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
  showSearch: boolean = false;
  searchQuery: string = '';


  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateUserStatus(); // Controlla lo stato iniziale

    // Ascolta i cambiamenti di rotta per aggiornare la navbar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserStatus();
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

  hideSearch() {
    if (this.searchQuery === '') {
      this.showSearch = false;
    }
  }

  searchProduct() {
    const query = this.searchQuery.trim();

    if (query !== '') {
      console.log("🔍 Ricerca avviata per:", query);
      this.router.navigate(['/prodotti'], { queryParams: { nome: query } });
    } else {
      console.log("⚠️ Nessun termine di ricerca inserito. Mostro tutti i prodotti.");
      this.router.navigate(['/prodotti'], { queryParams: {} }); // Rimuove il parametro 'nome'
    }
  }
  


}
