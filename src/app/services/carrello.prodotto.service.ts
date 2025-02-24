import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrelloProdottoService {

   url = 'http://localhost:9090/rest/carrelloProdotto/'

   url2 = 'http://localhost:9090/rest/carrello/'

  constructor(private http:HttpClient) { }

  createCarrelloProdotto(body : {}){
    return this.http.post(this.url + "create", body);
  }

  listByUtente(id: number){
    return this.http.get(this.url2 + "listByUtente?idUtente=" + id);
  }
}
