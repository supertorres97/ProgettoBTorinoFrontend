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

}
