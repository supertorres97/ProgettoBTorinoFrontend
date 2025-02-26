import { Component, Inject, HostListener, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProdottiService } from '../../../services/prodotti.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards-sezione',
  standalone: false,
  templateUrl: './cards-sezione.component.html',
  styleUrls: ['./cards-sezione.component.css']
})
export class CardsSezioneComponent implements OnInit {

  prodotti: any[] = [];
  visibleCards: any[] = [];
  currentPage: number = 0;
  totalPages: number[] = [];
  cardsPerPage: number = 3;
  searchQuery: string = '';

  private touchStartX: number = 0;
  private touchEndX: number = 0;

  constructor(
    private serv: ProdottiService, 
    private router: Router, 
    private route: ActivatedRoute, 
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.updateCardsPerPage();
    this.updateVisibleCards();

    // Recupera i prodotti dal database
    this.serv.listProdotti().subscribe((resp: any) => {
      this.prodotti = resp.dati;
      this.updateTotalPages();
      this.updateVisibleCards();
    });

    // Gestisce la ricerca tramite URL
    this.route.queryParams.subscribe(params => {
      const nome = params['nome'];
      if (nome) {
        this.searchQuery = nome;
        this.cercaProdotti(nome);
      } else {
        this.getAllProdotti(); // Se non c'è parametro, carica tutti i prodotti
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateCardsPerPage();
    this.updateVisibleCards();
  }

  updateCardsPerPage() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      if (width >= 1024) {
        this.cardsPerPage = 3;
      } else if (width >= 768) {
        this.cardsPerPage = 2;
      } else {
        this.cardsPerPage = 1;
      }
      this.updateTotalPages();
    }
  }

  updateTotalPages() {
    this.totalPages = Array.from({ length: Math.ceil( 9 / this.cardsPerPage) });
  }

  updateVisibleCards() {
    const start = this.currentPage * this.cardsPerPage;
    this.visibleCards = this.prodotti.slice(start, start + this.cardsPerPage);
  }

  scrollCardsLeft() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateVisibleCards();
    }
  }

  scrollCardsRight() {
    if (this.currentPage < this.totalPages.length - 1) {
      this.currentPage++;
      this.updateVisibleCards();
    }
  }

  goToPage(index: number) {
    this.currentPage = index;
    this.updateVisibleCards();
  }

  // Gestione della ricerca dei prodotti
  cercaProdotti(nome: string): void {
    if (!nome.trim()) {
      this.getAllProdotti();
      return;
    }

    this.serv.getProdottiByNome(nome).subscribe({
      next: (data: any) => {
        this.prodotti = data.dati;
        this.updateTotalPages();
        this.updateVisibleCards();
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
        this.updateTotalPages();
        this.updateVisibleCards();
      },
      error: (err) => {
        console.error('Errore nel recupero dei prodotti', err);
        this.prodotti = [];
      }
    });
  }

  // Gestione dello swipe
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  onTouchEnd() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    if (swipeDistance > 50) {
      this.scrollCardsLeft();  // Swipe verso destra
    } else if (swipeDistance < -50) {
      this.scrollCardsRight(); // Swipe verso sinistra
    }
  }

  // Gestione della navigazione ai dettagli del prodotto
  dettagliProdotto(id: number) {
    this.router.navigate(['/prodotto/', id]);
  }
}

