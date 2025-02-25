import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarrelloProdottoService } from '../../services/carrello.prodotto.service';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrello',
  standalone: false,

  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent implements OnInit {
  
  prodotto: any;
  prodottiCarrello: any[] = [];
  idCarrello: number | null = null;

  constructor(private carrelloService: CarrelloProdottoService, private auth: AuthService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private prodottiService: ProdottiService) {}

  ngOnInit(): void {
    // Controllo se la route contiene il parametro 'id'
    this.route.paramMap?.subscribe(params => {
      const idProdotto = params.get('id');
      
      if (idProdotto) { // Se c'è un parametro 'id'
        this.prodottiService.getProdotto(Number(idProdotto)).subscribe({
          next: (data) => {
            this.prodotto = data;
            console.log("Prodotto trovato:", this.prodotto); // Log per debugging
          },
          error: (err) => console.error("Errore nel recupero del prodotto:", err)
        });
      }
    });
  
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
  
    if (newQuantity >= 0) { // Evita quantità negative o zero
      prodotto.quantita = newQuantity;
  
      // Prepara il body per l'aggiornamento nel database
      const body = {
        id: prodotto.id,
        quantita: newQuantity,
        carrello: this.idCarrello,
        prodotto: prodotto.prodotto.id
      };
  
      // Chiamata al service per aggiornare il backend
      this.carrelloService.updateCarrelloProdotto(body).subscribe({
        next: () => {
          console.log("Quantità aggiornata con successo:", newQuantity);
          this.cdr.detectChanges(); // Forza il rilevamento delle modifiche
          window.location.reload();
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

  svuotaCarrello(): void {
    if (this.idCarrello === null) {
      alert("Errore: ID carrello non trovato.");
      return;
    }
  
    if (confirm("Sei sicuro di voler svuotare il carrello?")) {
      this.carrelloService.svuotaCarrello(this.idCarrello).subscribe({
        next: () => {
          this.prodottiCarrello = []; // Svuota il carrello nel frontend
          this.cdr.detectChanges();  // Forza il rilevamento delle modifiche
          console.log("Carrello svuotato con successo!");
        },
        error: (err) => {
          console.error("Errore durante lo svuotamento del carrello:", err);
          alert("Si è verificato un errore durante lo svuotamento del carrello.");
        }
      });
    }
  }

  calcolaTotale(): number {
    return this.prodottiCarrello.reduce((total, prodotto) => {
      return total + (prodotto.prodotto.prezzo * prodotto.quantita);
    }, 0);
  }

  acquista(): void {
    if (!this.idCarrello) {
      alert("Errore: ID carrello non trovato.");
      return;
    }
  
    if (this.prodottiCarrello.length === 0) {
      alert("Il carrello è vuoto!");
      return;
    }
  
    const requestBody = { id: this.idCarrello };
  
    this.carrelloService.acquistaCarrelloProdotto(requestBody).subscribe({
      next: (response: any) => {
        if (response.rc) {
          alert("Acquisto completato con successo!");
          this.prodottiCarrello = []; // Svuota il carrello nel frontend
          this.cdr.detectChanges(); // Forza il rilevamento delle modifiche
        } else {
          alert("Errore durante l'acquisto: " + response.msg);
        }
      },
      error: (error) => {
        console.error("Errore durante l'acquisto:", error);
        alert("Si è verificato un errore durante l'acquisto. Riprova.");
      }
    });
  }
  
  


}