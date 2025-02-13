import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-cards-sezione',
  standalone: false,
  
  templateUrl: './cards-sezione.component.html',
  styleUrl: './cards-sezione.component.css'
})
export class CardsSezioneComponent implements OnInit {
  cards = [
    { id: 1, img: 'Dolce7.jpeg', title: 'Torta al cioccolato', description: 'Dolce soffice e gustoso' },
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
  cardsPerPage: number = 3;
  
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateCardsPerPage();
    this.updateVisibleCards();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateCardsPerPage();
    this.updateVisibleCards();
  }

  updateCardsPerPage() {
    const width = window.innerWidth;
    if (width >= 1024) {
      this.cardsPerPage = 3;
    } else if (width >= 768) {
      this.cardsPerPage = 2;
    } else {
      this.cardsPerPage = 1;
    }
    this.totalPages = Array.from({ length: Math.ceil(this.cards.length / this.cardsPerPage) });
  }

  updateVisibleCards() {
    const start = this.currentPage * this.cardsPerPage;
    this.visibleCards = this.cards.slice(start, start + this.cardsPerPage);
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
}
