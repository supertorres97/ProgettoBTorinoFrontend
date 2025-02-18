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
        localStorage.setItem("idUtente", "null");
        this.isAdmin = false;
        this.isLoggedIn = false;
        this.idUtente = null;
      }
      console.log("logged: " + localStorage.getItem("isLoggedIn"));
      console.log("Admin: " + localStorage.getItem("isAdmin"));
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

  setLoggedOut(){
    this.isLoggedIn = false;
    localStorage.setItem("isLoggedIn", "0");
    localStorage.setItem("isAdmin", "0");
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
    localStorage.removeItem('idUtente');
    this.isAdmin = false;
    this.isLoggedIn = false;
  }

  setRoleAdmin(){
    this.isAdmin = true;
    localStorage.setItem("isAdmin", "1");
  }

  setRoleUser(){
    this.isAdmin = false;
    localStorage.setItem("isAdmin", "0");
  }

  resetAll() : void {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }

  setLogin(idUtente: number) {
    localStorage.setItem('idUtente', idUtente.toString());
  }
}
