import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RuoliService {

  private url = 'http://localhost:9090/rest/ruoli';
  constructor(private http: HttpClient) { }

  getRuoloByDescrizione(desc: string){
    return this.http.get(this.url + "/listByDescrizione?desc="+ desc);
  }
  
  listAll(){
    return this.http.get(this.url + "/listAll");
  }
  
}
