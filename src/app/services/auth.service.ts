import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  // Esponiamo lo stato come Observable
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Metodo per simulare il login
  login(): void {
    this.loggedIn.next(true);
  }

  // Metodo per simulare il logout
  logout(): void {
    this.loggedIn.next(false);
  }
  constructor() { }
}
