import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private url = 'http://localhost:9090/rest/feedback/';

  constructor(private http: HttpClient) { }

  listFeedback(id : string) {
    let params = new HttpParams().set('id', id);
    return this.http.get(this.url + "listByProdottoID", {params});
  }

  listAllFeedback() {
    return this.http.get(this.url + 'listAll');
  }

  deleteFeedback(body : {}) {
    return this.http.post(this.url + 'delete', body);
  }

  create(body : {}){
    return this.http.post(this.url + "create", body);
  }

  getByUtenteProdotto(utente: number, prodotto: number) {
    let params = new HttpParams()
      .set('utente', utente.toString()) // Converti il numero in stringa
      .set('prodotto', prodotto.toString());
  
    return this.http.get(this.url + "getByUtenteProdotto", { params });
  }
}
