import { Component } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoProdottoService } from '../../services/tipo-prodotto.service';

@Component({
  selector: 'app-prodotti-per-tipo',
  standalone: false,
  
  templateUrl: './prodotti-per-tipo.component.html',
  styleUrl: './prodotti-per-tipo.component.css'
})
export class ProdottiPerTipoComponent {
    response:any;
    data:any;

    tpNome:any;

    showSearch: boolean = false;
    searchQuery: string = '';
  
 //   prodotti: any[] = [];
 //   searchQuery: string = '';
  
    id:any;

    constructor(private serv:ProdottiService, private router:Router, private route: ActivatedRoute, private tProdS:TipoProdottoService) { }
  
    ngOnInit(): void {
      // Ascolta i cambiamenti della rotta e aggiorna i dati
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
    
        console.log("onInit prodotti");
        console.log("id tipo prodotto: " + this.id);
    
        this.tProdS.getTipoProdotto(this.id).subscribe((resp: any) => {
          this.tpNome = resp.dati;
        });
    
        this.serv.getProdottiByTipoProdotto(this.id).subscribe((resp: any) => {
          if (!resp.rc) {
            alert("Errore nella pagina");
          }
          console.log("subscribe prodotti ");
          this.response = resp;
          this.data = this.response.dati;
        });
      });
    }
/*  
        this.route.queryParams.subscribe(params => {
          const nome = params['nome'];
          if (nome) {
            this.searchQuery = nome;
            this.cercaProdotti(nome);
          } else {
            this.getAllProdotti(); // Se non c'è parametro, carica tutto
          }
        });*/
  /*
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
*/  
    dettagliProdotto(id:number){
      console.log(id);
      this.router.navigate(['/prodotto/', id]);
    }

    hideSearch() {
      if (this.searchQuery === '') {
        this.showSearch = false;
      }
    }
  
    searchProduct() {
      const query = this.searchQuery.trim();
  
      if (query !== '') {
        this.router.navigate(['/prodotti'], { queryParams: { nome: query } });
      } else {
        this.router.navigate(['/prodotti'], { queryParams: {} }); // Rimuove il parametro 'nome'
      }
    }
}
