import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin = false;
  isLoggedIn = false;
  idUtente: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Solo nel browser, accedi a localStorage
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


  setIdUtente(idUtente: number){
    localStorage.setItem("idUtente", idUtente.toString()); // Salva l'ID nel localStorage
  }
  getIdUtente(){
    const id = localStorage.getItem("idUtente");
    return id ? Number(id) : null;  
  }

  isAutentificated(){
    return this.isLoggedIn;
  }

  isRoleAdmin(){
    return this.isAdmin;
  }

  setAutentificated(){
    this.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "1");
  }

  setLogout(){
    localStorage.setItem("isLoggedIn", "0");
    localStorage.setItem("isAdmin", "0");
    this.isAdmin = false;
    this.isLoggedIn = false;
  }

  setAdmin(){
    localStorage.setItem("isAdmin", "1");
    this.isAdmin = true;
  }

  setUser(){
    localStorage.setItem("isAdmin", "0");
    this.isAdmin = false;
  }

}
