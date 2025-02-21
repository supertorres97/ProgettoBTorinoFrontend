import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface Ordine {
  id: number;
  totale: number;
  indirizzo: string;
  status: string;
  dataOrdine: string;
}

export interface Ordine {
  id: number;
  totale: number;
  indirizzo: string;
  status: string;
  dataOrdine: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrdineService {
  url = 'http://localhost:9090/rest/ordine'

  constructor(private http: HttpClient, private router: Router) {}

  getOrdiniByUtente(id: number) {
      return this.http.get(this.url + "/listByUtente?idUtente=" + id);
  }

  getAllOrdini() {
    return this.http.get(this.url + "/listAll");
  }

  updateOrdine(ordine: { id: number; status?: string; totale?: number}){
    return this.http.post(this.url + "/update", ordine);
  }

  dettagliOrdine(id: number) {
    this.router.navigate(['/dettagli-ordine', id]);
  }

  cancelOrder(id: number){
    return this.http.post(this.url + "/delete", id);
  }

  verificaOrdine(orderId: number, userId: number): Observable<boolean> {
    const params = new HttpParams()
    .set("idOrdine", orderId.toString())
    .set("idUtente", userId.toString());

  return this.http.get<boolean>(this.url + "/verificaOrdine", { params });
  }
}