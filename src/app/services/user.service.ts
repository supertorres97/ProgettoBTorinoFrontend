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

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/listById?id=${id}`).pipe(
      map(response => {
        if (response.rc) {
          return response.dati; // Restituisce solo i dati dell'utente
        } else {
          throw new Error(response.msg); // Gestisce eventuali errori
        }
      })
    );
  }

  updateUserProfile(body: {}):any{
    return this.http.post(this.url + "/update", body);
  }
  getUtente(id:number){  
    let params = new HttpParams().set('id', toString());
    return this.http.get(this.url + "/listByID?id=" + id);
  }
  signin(body:{}){
    return this.http.post("http://localhost:9090/rest/credenziali/signin", body);
  }
}