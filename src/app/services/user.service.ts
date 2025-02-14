import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url = 'http://localhost:9090/rest/utente'; // Sostituisci con l'URL del tuo backend
  
    constructor(private http: HttpClient) {}
  
    // Metodo per aggiornare il profilo dell'utente
    updateUserProfile(body: {}): any {
      return this.http.post(this.url + "/update", body);
    }
  
    // Metodo per ottenere i dettagli di un utente tramite ID
    getUtente(id: number): Observable<any> {
      // Qui correggi l'uso di HttpParams, puoi evitare di usarlo se preferisci
      return this.http.get(`${this.url}/listByID?id=${id}`);
    }
  
    // Metodo per il login/signin
    signin(body: { username: string, pwd: string }): Observable<any> {
      return this.http.post("http://localhost:9090/rest/credenziali/signin", body);
    }

    
  signup(formData: any): Observable<any> {
    return this.http.post("http://localhost:9090/rest/credenziali/signup", formData);
  }
}