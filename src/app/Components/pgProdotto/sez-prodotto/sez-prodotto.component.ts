import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdottiService } from '../../../services/prodotti.service';
import { CarrelloProdottoService } from '../../../services/carrello.prodotto.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-sez-prodotto',
  standalone: false,
  
  templateUrl: './sez-prodotto.component.html',
  styleUrl: './sez-prodotto.component.css'
})
export class SezProdottoComponent implements OnInit{

  prodotto:any;
  idCarrello: number | null = null;
  

  constructor(private serv:ProdottiService, private location: Location, private route:ActivatedRoute, private cdr: ChangeDetectorRef, private carrelloProdottoService: CarrelloProdottoService, private auth:AuthService){}

  getCarrelloId(){
    const userId = this.auth.getIdUtente();
    if(userId !== null){
    this.carrelloProdottoService.listByUtente(userId).subscribe({
      next: (response: any) => {
        this.idCarrello = response.dati?.id;
      },
      error: (error) => {
        console.error('Errore nel recupero del Id Carrello:', error);
      }
    });
    }else{
      console.log("Utente non trovato");
    }

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.serv.getProdotto(+id).subscribe((response: any) => {
        /* console.log("Dati ricevuti:", response); // Debug in console */
        this.prodotto = response.dati; // Estrai il vero oggetto prodotto
        this.cdr.detectChanges();
      });
    }
    this.getCarrelloId();
  }

  goBack(): void {
    this.location.back();
  }

  quantity: number = 1; // Valore iniziale

  changeQuantity(amount: number): void {
    const newQuantity = this.quantity + amount;
    if (newQuantity >= 1) { // Impedisce di scendere sotto 1
      this.quantity = newQuantity;
      console.log('Nuova quantità:', this.quantity);
      this.cdr.detectChanges();
    }
  }

  aggiungiAlCarrello(): void {
    if (!this.prodotto) return; // Evita errori se il prodotto non è caricato

    const carrelloProdotto = {
      prodotto: this.prodotto.id,
      quantita: this.quantity,
      carrello: this.idCarrello
    };

    console.log('CarrelloProdotto:', carrelloProdotto);

    this.carrelloProdottoService.createCarrelloProdotto(carrelloProdotto).subscribe({
      next: (response) => {
        console.log('Prodotto aggiunto al carrello:', response);
        alert('Prodotto aggiunto al carrello con successo!');
      },
      error: (error) => {
        console.error('Errore nell\'aggiunta al carrello:', error);
        alert('Errore durante l\'aggiunta al carrello');
      }
    });
  }


}
