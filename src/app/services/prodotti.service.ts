import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  url = 'http://localhost:9090/rest/prodotto/'

  constructor(private http:HttpClient) { }

  listPrdotti() {
    return this.http.get(this.url + "listAll");
  }

  getProdotto(id : number) {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + "get", {params});
  }

  createProdotto(body : {}) {
    return this.http.post(this.url + "create", body);
  }

  deleteProdotto(body : {}) {
    return this.http.post(this.url + "delete", body);
  }

  updateProdotto(body : {}) {
    return this.http.post(this.url + "update", body);
  }
}
