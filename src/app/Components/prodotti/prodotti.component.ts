import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent implements OnInit{

  response:any;
  data:any;

  prodotti: any[] = [];
  searchQuery: string = '';


  constructor(private serv:ProdottiService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("onInit prodotti");
    this.serv.listProdotti()
      .subscribe((resp:any) => {
        console.log("subscribe prodotti ");
        this.response = resp;
        this.data = this.response.dati;
      })

      this.route.queryParams.subscribe(params => {
        const nome = params['nome'];
        if (nome) {
          this.searchQuery = nome;
          this.cercaProdotti(nome);
        } else {
          this.getAllProdotti(); // Se non c'è parametro, carica tutto
        }
      });
  }

  cercaProdotti(nome: string): void {
    if (!nome.trim()) { // Se il nome è vuoto o solo spazi, carica tutti i prodotti
    this.getAllProdotti();
    return;
  }

  this.serv.getProdottiByNome(nome).subscribe({
    next: (data: any) => {
      this.prodotti = data.dati;
    },
    error: (err) => {
      console.error('Errore nella ricerca dei prodotti', err);
    }
  });

  // Aggiorna la URL con il nuovo parametro di ricerca
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: nome ? { nome } : {}, // Se nome è vuoto, rimuove il parametro dalla URL
    queryParamsHandling: 'merge'
  });
  }


  getAllProdotti(): void {
    this.serv.listProdotti().subscribe({
      next: (response: any) => {
        this.prodotti = response.dati;
      },
      error: (err) => {
        console.error('Errore nel recupero dei prodotti', err);
        this.prodotti = [];
      }
    });
  }

  dettagliProdotto(id:number){
    console.log(id);
    this.router.navigate(['/pgProdotto', id]);
  }

}
