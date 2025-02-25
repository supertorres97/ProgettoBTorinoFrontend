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

  listByCarrello(id: number){
    return this.http.get(this.url + "listByCarrello?idCart=" + id);
  }

  removeCarrelloProdotto(id: number) {
    return this.http.post(this.url + "remove?id=" + id, {});
  }  

  updateCarrelloProdotto(body: {}){
    return this.http.post(this.url + "update", body);
  }

  svuotaCarrello(idCart: number){
    return this.http.post(this.url + "svuotaCarrello?idCart=" + idCart, {});
  }

  acquistaCarrelloProdotto(body: any) {
    return this.http.post(this.url + "acquista", body);
  }
}

