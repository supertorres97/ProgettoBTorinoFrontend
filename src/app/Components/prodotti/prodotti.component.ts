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
  showSearch: boolean = false;
  searchQuery: string = '';
  prodotti: any[] = [];
  timestamp: number = new Date().getTime();
  page: number = 1;
  itemsPerPage: number = 9;

  constructor(private serv:ProdottiService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.serv.listProdotti()
      .subscribe((resp:any) => {
        this.response = resp;
        this.data = this.response.dati;
      })

      this.route.queryParams.subscribe(params => {
        const nome = params['nome'];
        if (nome) {
          this.searchQuery = nome;
          this.cercaProdotti(nome);
        } else {
          this.getAllProdotti();
        }
      });
  }

  cercaProdotti(nome: string): void {
    if (!nome.trim()) {
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

  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: nome ? { nome } : {},
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
      this.router.navigate(['/prodotti'], { queryParams: {} });
    }
  }
  onImageError(imageUrl: string) {
    console.error("Errore nel caricamento dell'immagine:", imageUrl);
  }

}
