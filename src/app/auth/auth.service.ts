import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isAdmin = false;
  isLoggedIn = false;
  idUtente = 0;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    if(isPlatformBrowser(this.platformId)){
      const isLoggedInValue = localStorage.getItem("isLoggedIn");
      const isAdminValue = localStorage.getItem("isAdmin");
      
      if(isLoggedInValue!== null && isAdminValue !== null){
          console.log("token exists");
          this.isLoggedIn = isLoggedInValue === '1';
      } else {
        localStorage.setItem("isLoggedIn", "0");
        localStorage.setItem("isAdmin", "0");
        this.isAdmin = false;
        this.isLoggedIn = false;
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
