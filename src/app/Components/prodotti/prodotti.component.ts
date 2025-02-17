import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent implements OnInit{

  response:any;
  data:any;

  constructor(private serv:ProdottiService, private router:Router) { }

  ngOnInit(): void {
    console.log("onInit prodotti");
    this.serv.listPrdotti()
      .subscribe((resp:any) => {
        console.log("subscribe prodotti ");
        this.response = resp;
        this.data = this.response.dati;
      })
  }

  dettagliProdotto(id:number){
    console.log(id);
    this.router.navigate(['/pgProdotto', id]);
  }

}
