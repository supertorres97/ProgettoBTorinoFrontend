import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProdottiService } from '../../../services/prodotti.service';
import { CarrelloProdottoService } from '../../../services/carrello.prodotto.service';
import { AuthService } from '../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sez-prodotto',
  standalone: false,

  templateUrl: './sez-prodotto.component.html',
  styleUrl: './sez-prodotto.component.css'
})
export class SezProdottoComponent implements OnInit {

  prodotto: any;
  idCarrello: number | null = null;
  idUtente: number | null = null;

  constructor(private serv: ProdottiService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private carrelloProdottoService: CarrelloProdottoService,
    private auth: AuthService,
    private _snackBar: MatSnackBar) { }



  getCarrelloId() {
    const userId = this.auth.getIdUtente();
    if (userId !== null) {
      this.carrelloProdottoService.listByUtente(userId).subscribe({
        next: (response: any) => {
          this.idCarrello = response.dati?.id;
        },
        error: (error) => {
          console.error('Errore nel recupero del Id Carrello:', error);
        }
      });
    } else {
      console.log("Utente non trovato");
    }

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.serv.getProdotto(+id).subscribe((response: any) => {
        this.prodotto = response.dati;
        this.cdr.detectChanges();
      });

    }
    this.getCarrelloId();
  }

  goBack(): void {
    this.location.back();
  }

  quantity: number = 1;

  changeQuantity(amount: number): void {
    const newQuantity = this.quantity + amount;
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
      console.log('Nuova quantità:', this.quantity);
      this.cdr.detectChanges();
    }
  }

  aggiungiAlCarrello(): void {
    this.idUtente = this.auth.getIdUtente();
    console.log("Utente: " + this.auth.getIdUtente());

    if (this.idUtente == null || this.idUtente == 0) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.prodotto) return;

    const carrelloProdotto = {
      prodotto: this.prodotto.id,
      quantita: this.quantity,
      carrello: this.idCarrello
    };

    this.carrelloProdottoService.createCarrelloProdotto(carrelloProdotto).subscribe({
      next: () => {
        const snackBarRef = this._snackBar.open('Prodotto aggiunto al carrello!', 'Vai al carrello', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });

        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/carrello']);
        });
      },
      error: () => {
        console.error("Errore durante l'aggiunta al carrello");
      }
    });
  }

}
