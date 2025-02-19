import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoProdottoService {
  private url = 'http://localhost:9090/rest/tipoprodotto/'; // Sostituisci con l'URL della tua API

  constructor(private http: HttpClient) {}

  listTipoProdotti() {
    return this.http.get(this.url + 'listAll');
  }

  createTipoProdotto(body : {}) {
    return this.http.post(this.url + "create", body);
  }

  updateTipoProdotto(body : {}) {
    return this.http.post(this.url + "update", body);
  }

  getTipoProdotto(id : number){
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + "listByID", {params});
  }
}