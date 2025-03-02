import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {

  private url = 'http://localhost:9090/rest/prodotto/';

  constructor(private http: HttpClient) { }

  getProdotto(id: number): Observable<any>{
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + "listByID", {params});
  }
}
