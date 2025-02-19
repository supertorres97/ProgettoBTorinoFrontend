import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private url = 'http://localhost:9090/rest/feedback/';

  constructor(private http: HttpClient) { }

  getFeedbackByProductId(productId: number): Observable<any[]> {
    let params = new HttpParams().set('id', productId.toString());
    return this.http.get<any>(this.url + "listByProdottoID", { params }).pipe(
        tap(response => console.log("Feedback Response:", response)), // Log per debug
        map(response => Array.isArray(response) ? response : []) // Assicura che sia sempre un array
    );
  }
}
