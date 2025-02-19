import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoProdottoService {
  private apiUrl = 'http://localhost:9090/rest/tipoProdotto/listAll'; // Sostituisci con l'URL della tua API

  constructor(private http: HttpClient) {}

  getTipoProdotti(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}