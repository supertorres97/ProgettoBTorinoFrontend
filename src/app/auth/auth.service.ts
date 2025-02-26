import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarrelloProdottoService } from '../services/carrello.prodotto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin = false;
  isLoggedIn = false;
  idUtente: number | null = null;
  idCarrello: number | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private serv: CarrelloProdottoService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAuthState();
    }
  }

  private loadAuthState() {
    const isLoggedInValue = localStorage.getItem("isLoggedIn");
    const isAdminValue = localStorage.getItem("isAdmin");
    const idUtenteValue = localStorage.getItem("idUtente");

    this.isLoggedIn = isLoggedInValue === "1";
    this.isAdmin = isAdminValue === "1";
    this.idUtente = idUtenteValue ? parseInt(idUtenteValue, 10) : null;

    if (this.isLoggedIn && this.idUtente !== null) {
      this.serv.listByUtente(this.idUtente).subscribe((res: any) => {
        this.idCarrello = res.idCarrello;
      });
    }
  }

  login(idUtente: number, isAdmin: boolean = false) {
    this.isLoggedIn = true;
    this.isAdmin = isAdmin;
    this.idUtente = idUtente;
    
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("isAdmin", isAdmin ? "1" : "0");
    localStorage.setItem("idUtente", idUtente.toString());
  }

  logout() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.idUtente = null;
    this.idCarrello = null;

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("idUtente");
    localStorage.removeItem("idCarrello");
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  isRoleAdmin(): boolean {
    return this.isAdmin;
  }

  setRoleAdmin() {
    this.isAdmin = true;
    localStorage.setItem("isAdmin", "1");
  }

  setRoleUser() {
    this.isAdmin = false;
    localStorage.setItem("isAdmin", "0");
  }

  setIdCarrello(idCarrello: number) {
    this.idCarrello = idCarrello;
    localStorage.setItem("idCarrello", idCarrello.toString());
  }

  getIdCarrello(): number | null {
    return this.idCarrello || Number(localStorage.getItem("idCarrello")) || null;
  }

  setIdUtente(idUtente: number) {
    this.idUtente = idUtente;
    localStorage.setItem("idUtente", idUtente.toString());
  }

  getIdUtente(): number | null {
    return this.idUtente || Number(localStorage.getItem("idUtente")) || null;
  }
}
