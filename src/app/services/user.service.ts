import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url = 'http://localhost:9090/rest/utente'; // Sostituisci con l'URL del tuo backend
  
    constructor(private http: HttpClient) {}
  
    updateUserProfile(body: {}): any {
      return this.http.post(this.url + "/update", body);
    }
  
    getUtente(id: number) {
      return this.http.get(this.url +"/listByID?id=" + id);
    }
}