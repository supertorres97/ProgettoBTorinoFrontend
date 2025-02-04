import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  showErrorMessage: boolean = false;  // Flag per mostrare il messaggio di errore

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Verifica se il parametro 'error' è presente nell'URL
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'true') {
        this.showErrorMessage = true;  // Mostra il messaggio di errore

        // Nascondi il messaggio di errore dopo 2 secondi
        setTimeout(() => {
          this.showErrorMessage = false;  // Nasconde il messaggio
        }, 2000);  // Tempo di visualizzazione del popup (2 secondi)
      }
    });
    this.updateVisibleCards();
  }
  
  cards = [
    { id: 1, img: 'Dolce1.jpg', title: 'Torta al cioccolato', description: 'Dolce soffice e gustoso' },
    { id: 2, img: 'Dolce2.jpg', title: 'Waffle', description: 'Cialda croccante con miele' },
    { id: 3, img: 'Dolce3.jpg', title: 'Cupcake', description: 'Morbido dolce con crema' },
    { id: 4, img: 'Dolce4.png', title: 'Tiramisù', description: 'Dolce al caffè e mascarpone' },
    { id: 5, img: 'Dolce5.jpg', title: 'Pancakes', description: 'Dolce americano con sciroppo' },
    { id: 6, img: 'Dolce6.jpg', title: 'Cheesecake', description: 'Base croccante e crema' },
    { id: 7, img: 'Dolce4.png', title: 'Tiramisù', description: 'Dolce al caffè e mascarpone' },
    { id: 8, img: 'Dolce5.jpg', title: 'Pancakes', description: 'Dolce americano con sciroppo' },
    { id: 9, img: 'Dolce6.jpg', title: 'Cheesecake', description: 'Base croccante e crema' }
  ];

  visibleCards: any[] = [];
  currentPage: number = 0;
  totalPages: number[] = [];

  updateVisibleCards() {
    this.totalPages = Array.from({ length: Math.ceil(this.cards.length / 3) });
    const start = this.currentPage * 3;
    this.visibleCards = this.cards.slice(start, start + 3);
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
}


