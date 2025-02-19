import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoProdottoService {
  private apiUrl = 'http://localhost:9090/rest/tipoProdotto'; // Assicurati che l'URL sia corretto

  constructor(private http: HttpClient) {}

  getTipoProdotti(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listAll`);
  }

  createTipoProdotto(tipoProdotto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, tipoProdotto);
  }

  updateTipoProdotto(tipoProdotto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update`, tipoProdotto);
  }

  deleteTipoProdotto(tipoProdotto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/delete`, tipoProdotto);
  }
}