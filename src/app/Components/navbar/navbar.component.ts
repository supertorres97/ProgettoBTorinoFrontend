import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { TipoProdottoService } from '../../services/tipo-prodotto.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
  animations: [
    trigger('slideDown', [
      state('closed', style({
        height: '0px',
        overflow: 'hidden',
        opacity: 0
      })),
      state('open', style({
        height: '*',
        opacity: 1
      })),
      transition('closed => open', [
        animate('300ms ease-in-out')
      ]),
      transition('open => closed', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  idUtente: number | null = null;
  
  isAdmin = false;
  isSidebarOpen = false;
  tipi: any;
  response: any;
  data: any;

  constructor(private auth: AuthService, private router: Router, private serv: TipoProdottoService) {}

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
    this.serv.listTipoProdotti() //NUOVO VVV
      .subscribe((resp:any) => {
        console.log("subscribe prodotti ");
        this.response = resp;
        this.data = this.response.dati;
      })
  }

  goTo(id: number) {
    console.log("Navigo a:", id);
    this.router.navigateByUrl(`/prodottiPerTipo/${id}`, { skipLocationChange: false }).then(() => {
      console.log("Navigazione completata");
    });
  }

  isNavbarOpen = false;

toggleNavbar() {
  this.isNavbarOpen = !this.isNavbarOpen;
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
