import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent implements OnInit, AfterViewInit{

  response:any;
  data:any;

  showSearch: boolean = false;
  searchQuery: string = '';

  prodotti: any[] = [];
  timestamp: number = new Date().getTime();

  constructor(private serv:ProdottiService, private router:Router, private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }
  ngAfterViewInit(): void {
    this.forceUpdateToDetectChanges();
  }
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
          this.getAllProdotti(); // Se non c'è parametro, carica tutto
        }
      });
      this.forceUpdateToDetectChanges();
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

  forceUpdateToDetectChanges(): void {
    this.timestamp = new Date().getTime();
    this.cd.detectChanges();
  }
}
