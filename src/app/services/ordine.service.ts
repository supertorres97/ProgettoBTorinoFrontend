import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getOrdiniByUtente(id :number) {
      return this.http.get(this.url + "/listByUtente?idUtente=" + id);
  }

  dettagliOrdine(id: number) {
    this.router.navigate(['/dettagli-ordine', id]);
  }

  cancelOrder(id: number){
    return this.http.post(this.url + "/delete", id);
  }
}