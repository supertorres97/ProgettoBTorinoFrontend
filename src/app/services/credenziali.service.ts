import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CredenzialiReq {
  id: number;
  username: string;
  password: string;
  attivo: boolean;
  idUtente: number;
  idRuolo: number;
}

@Injectable({
  providedIn: 'root'
})

export class CredenzialiService {
  private url = 'http://localhost:9090/rest/credenziali'; // Sostituisci con l'URL del tuo backend
  
  constructor(private http: HttpClient) {}
  
  signin(body: { username: string, pwd: string }): any {
     return this.http.post(this.url + "/signin", body);
  }

  signup(body: {}): Observable<any> {
    return this.http.post(this.url + "/signup", body);
  }
  changePassword(body:{}): any{
    return this.http.post(this.url + "/update", body);
  }

  updateCredenziali(body:{}): any{
    return this.http.post(this.url + "/updateCredenziali", body);
  }

  getCredenzialiByUtente(id:number): any{
    return this.http.get(this.url + "/listByIdUtente?id=" + id);
  }
  getRuoliByCredenziali(id:number): any{
    return this.http.get(this.url + "/listRuoli?id=" + id);
  }
  
  getAllCredenziali(): any{
    return this.http.get(this.url + "/listAll");
  }

  deleteCredenziali(body:{}): any{                          //logica
    return this.http.post(this.url + "/delete", body);
  }
}