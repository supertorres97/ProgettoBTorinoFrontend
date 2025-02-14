import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin = false;
  isLoggedIn = false;
  idUtente: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedInValue = localStorage.getItem("isLoggedIn");
      const isAdminValue = localStorage.getItem("isAdmin");
      const idUtenteValue = localStorage.getItem("idUtente");

      if (isLoggedInValue !== null && isAdminValue !== null && idUtenteValue !== null) {
        this.isLoggedIn = isLoggedInValue === '1';
        this.isAdmin = isAdminValue === '1';
        this.idUtente = parseInt(idUtenteValue, 10);
      } else {
        localStorage.setItem("isLoggedIn", "0");
        localStorage.setItem("isAdmin", "0");
        localStorage.setItem("idUtente", "0");
        this.isAdmin = false;
        this.isLoggedIn = false;
        this.idUtente = null;
      }
    }
  }

  setIdUtente(id: number): void {
    this.idUtente = id;
    localStorage.setItem("idUtente", id.toString());
  }

  getIdUtente(): number | null {
    return this.idUtente;
  }

  isAutentificated(): boolean {
    return this.isLoggedIn;
  }

  isRoleAdmin(): boolean {
    return this.isAdmin;
  }

  setAutentificated(): void {
    this.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "1");
  }

  setLogout(): void {
    localStorage.setItem("isLoggedIn", "0");
    localStorage.setItem("isAdmin", "0");
    localStorage.setItem("idUtente", "0");
    this.isAdmin = false;
    this.isLoggedIn = false;
    this.idUtente = null;
  }

  setAdmin(): void {
    localStorage.setItem("isAdmin", "1");
    this.isAdmin = true;
  }

  setUser(): void {
    localStorage.setItem("isAdmin", "0");
    this.isAdmin = false;
  }
}