import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CarrelloProdottoService } from '../../services/carrello.prodotto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-carrello',
  standalone: false,

  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent implements OnInit {
  
  prodottiCarrello: any[] = [];
  idCarrello: number | null = null;

  constructor(private carrelloService: CarrelloProdottoService, private auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getCarrello();
  }

  getCarrello(): void {
    const userId = this.auth.getIdUtente();
    if (userId !== null) {
      this.carrelloService.listByUtente(userId).subscribe({
        next: (response: any) => {
          this.idCarrello = response.dati?.id;
          if (this.idCarrello) {
            this.carrelloService.listByCarrello(this.idCarrello).subscribe({
              next: (res: any) => {
                this.prodottiCarrello = res.dati;
              },
              error: (err) => console.error('Errore nel recupero prodotti carrello:', err)
            });
          }
        },
        error: (error) => console.error('Errore nel recupero ID carrello:', error)
      });
    } else {
      console.log("Utente non trovato");
    }
  }
  changeQuantity(amount: number, prodotto: any): void {
    const newQuantity = prodotto.quantita + amount; // Incrementa/diminuisce la quantità
  
    if (newQuantity >= 1) { // Evita quantità negative o zero
      prodotto.quantita = newQuantity;
  
      // Prepara il body per l'aggiornamento nel database
      const body = {
        id: prodotto.id,
        quantita: amount,
        carrello: this.idCarrello,
        prodotto: prodotto.prodotto.id
      };
  
      // Chiamata al service per aggiornare il backend
      this.carrelloService.updateCarrelloProdotto(body).subscribe({
        next: () => {
          console.log("Quantità aggiornata con successo:", newQuantity);
          this.cdr.detectChanges(); // Forza il rilevamento delle modifiche
        },
        error: (error) => {
          console.error("Errore nell'aggiornamento della quantità:", error);
          alert("Si è verificato un errore nell'aggiornamento della quantità.");
        }
      });
    }
  }
  

  rimuoviProdotto(idProdottoCarrello: number): void {
    if (confirm("Sei sicuro di voler rimuovere questo prodotto dal carrello?")) {
        console.log("Rimozione prodotto con ID:", idProdottoCarrello);

        this.carrelloService.removeCarrelloProdotto(idProdottoCarrello).subscribe({
            next: (response) => {
                console.log("Prodotto rimosso con successo:", response);

                // Aggiorna la lista rimuovendo il prodotto eliminato
                this.prodottiCarrello = this.prodottiCarrello.filter(p => p.id !== idProdottoCarrello);
            },
            error: (err) => {
                console.error("Errore durante la rimozione del prodotto:", err);
                alert("Si è verificato un errore durante la rimozione del prodotto.");
            }
        });
    }
}


}