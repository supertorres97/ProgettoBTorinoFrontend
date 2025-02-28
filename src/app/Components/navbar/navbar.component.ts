import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { TipoProdottoService } from '../../services/tipo-prodotto.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private serv: TipoProdottoService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

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
    if (isPlatformBrowser(this.platformId)) {
      this.updateUserStatus();
    }
    this.isAdmin = this.auth.isRoleAdmin();
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserStatus();
        this.closeSidebar();
      }
    });
  
    this.serv.listTipoProdotti()
      .subscribe((resp: any) => {
        console.log("subscribe prodotti ");
        this.response = resp;
        this.data = this.response.dati;
      });
  }

  goTo(id: number) {
    console.log("Navigo a:", id);
    this.router.navigateByUrl(`/prodottiPerTipo/${id}`, { skipLocationChange: false }).then(() => {
      console.log("Navigazione completata");
    });
  }

  isNavbarOpen = false;
  isDropdownOpen = false;
  isDropdownAOpen = false;

toggleNavbar() {
  this.isNavbarOpen = !this.isNavbarOpen;
}

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}
toggleDropdownA() {
  this.isDropdownAOpen = !this.isDropdownAOpen;
}

updateUserStatus() {
  if (isPlatformBrowser(this.platformId)) { // Controlla se siamo nel browser
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
}

  logout() {
    this.auth.setLogout();
    localStorage.removeItem('idUtente'); // Rimuove idUtente per evitare problemi
    this.isLoggedIn = false;
    this.idUtente = null;
    this.router.navigate(['/home']);
  }

}
