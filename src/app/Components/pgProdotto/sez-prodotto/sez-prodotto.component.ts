import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdottiService } from '../../../services/prodotti.service';

@Component({
  selector: 'app-sez-prodotto',
  standalone: false,
  
  templateUrl: './sez-prodotto.component.html',
  styleUrl: './sez-prodotto.component.css'
})
export class SezProdottoComponent implements OnInit{

  prodotto:any;

  constructor(private serv:ProdottiService, private location: Location, private route:ActivatedRoute, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.serv.getProdotto(+id).subscribe((response: any) => {
        /* console.log("Dati ricevuti:", response); // Debug in console */
        this.prodotto = response.dati; // Estrai il vero oggetto prodotto
        this.cdr.detectChanges();
      });
    }
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

}
