import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DettaglioOrdineService {

  url = 'http://localhost:9090/rest/dettagli-ordine'
  
    constructor(private http: HttpClient) {}

  getDettagliOrdine(id: number) {
    return this.http.get(this.url + "/listByOrdineID?id=" + id);
  }
}
