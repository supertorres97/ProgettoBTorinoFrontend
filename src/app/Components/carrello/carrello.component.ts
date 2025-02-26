import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarrelloProdottoService } from '../../services/carrello.prodotto.service';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carrello',
  standalone: false,

  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css',
})
export class CarrelloComponent implements OnInit {
  prodotto: any;
  prodottiCarrello: any[] = [];
  idCarrello: number | null = null;

  constructor(
    private carrelloService: CarrelloProdottoService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private prodottiService: ProdottiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idProdotto = params.get('id');
      if (idProdotto) {
        this.prodottiService.getProdotto(Number(idProdotto)).subscribe({
          next: (data) => (this.prodotto = data),
          error: () => this.showError('Errore nel recupero del prodotto'),
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
              next: (res: any) => (this.prodottiCarrello = res.dati),
              error: () =>
                this.showError('Errore nel recupero dei prodotti nel carrello'),
            });
          }
        },
        error: () => this.showError('Errore nel recupero ID carrello'),
      });
    } else {
      this.showInfo('Utente non trovato');
    }
  }

  changeQuantity(amount: number, prodotto: any): void {
    const newQuantity = prodotto.quantita + amount;
    if (newQuantity >= 0) {
      prodotto.quantita = newQuantity;
      const body = {
        id: prodotto.id,
        quantita: newQuantity,
        carrello: this.idCarrello,
        prodotto: prodotto.prodotto.id,
      };

      this.carrelloService.updateCarrelloProdotto(body).subscribe({
        next: () => {
          this.getCarrello();
          this.showSuccess('Quantità aggiornata con successo!');
        },
        error: () => this.showError("Errore nell'aggiornamento della quantità"),
      });
    }
  }

  rimuoviProdotto(idProdottoCarrello: number): void {
    this.carrelloService.removeCarrelloProdotto(idProdottoCarrello).subscribe({
      next: () => {
        this.prodottiCarrello = this.prodottiCarrello.filter(
          (p) => p.id !== idProdottoCarrello
        );
        this.showSuccess('Prodotto rimosso con successo!');
      },
      error: () => this.showError('Errore durante la rimozione del prodotto'),
    });
  }

  svuotaCarrello(): void {
    if (this.idCarrello === null) {
      this.showError('Errore: ID carrello non trovato.');
      return;
    }

    this.carrelloService.svuotaCarrello(this.idCarrello).subscribe({
      next: () => {
        this.prodottiCarrello = [];
        this.cdr.detectChanges();
        this.showSuccess('Carrello svuotato con successo!');
      },
      error: () => this.showError('Errore durante lo svuotamento del carrello'),
    });
  }

  calcolaTotale(): number {
    return this.prodottiCarrello.reduce(
      (total, prodotto) => total + prodotto.prodotto.prezzo * prodotto.quantita,
      0
    );
  }

  acquista(): void {
    if (!this.idCarrello) {
      this.showError('Errore: ID carrello non trovato.');
      return;
    }

    if (this.prodottiCarrello.length === 0) {
      this.showInfo('Il carrello è vuoto!');
      return;
    }

    const requestBody = { id: this.idCarrello };

    this.carrelloService.acquistaCarrelloProdotto(requestBody).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.prodottiCarrello = [];
          this.cdr.detectChanges();
          this.showSuccess('Acquisto completato con successo!');
        } else {
          this.showError("Errore durante l'acquisto: " + response.msg);
        }
      },
      error: () =>
        this.showError(
          "Si è verificato un errore durante l'acquisto. Riprova."
        ),
    });
  }

  private showSuccess(message: string): void {
    this._snackBar.open(message, 'Chiudi', {
      duration: 3000,
      verticalPosition: 'bottom', // Mantiene la posizione in basso
      horizontalPosition: 'end', // Sposta a destra
    });
  }

  private showError(message: string): void {
    this._snackBar.open(message, 'Chiudi', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
    });
  }

  private showInfo(message: string): void {
    this._snackBar.open(message, 'Chiudi', {
      duration: 3000,

      verticalPosition: 'bottom',
      horizontalPosition: 'end',
    });
  }
}
