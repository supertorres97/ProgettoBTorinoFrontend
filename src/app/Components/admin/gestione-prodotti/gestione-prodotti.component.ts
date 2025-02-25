import { Component, ViewChild } from '@angular/core';
import { ProdottiService } from '../../../services/prodotti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreazioneProdottoComponent } from '../../creazione-prodotto/creazione-prodotto.component';
import { CreateProdottoComponent } from '../../../Dialog/create-prodotto/create-prodotto.component';
import { TipoProdottoService } from '../../../services/tipo-prodotto.service';

@Component({
  selector: 'app-gestione-prodotti',
  standalone: false,
  
  templateUrl: './gestione-prodotti.component.html',
  styleUrl: './gestione-prodotti.component.css'
})
export class GestioneProdottiComponent {

    @ViewChild('prodottiDialog') prodottiDialog: any;

    response:any;
    data:any;
    responseTP:any;
    tipiProdotto:any;
    selectedProdotto: any = {};
  
    constructor(
      private serv:ProdottiService, 
      private tprodS:TipoProdottoService,
      private router:Router, 
      private route: ActivatedRoute, 
      private dialog:MatDialog) { }
  
    ngOnInit(): void {
      console.log("onInit prodotti");
      this.loadProdotti();

      this.tprodS.listTipoProdotti()
      .subscribe((resp:any) => {
        console.log("subscribe prodotti ");
        this.responseTP = resp;
        this.tipiProdotto = this.responseTP.dati;
      });
    }
  
    loadProdotti(): void {
      this.serv.listProdotti()
      .subscribe((resp:any) => {
        console.log("subscribe prodotti ");
        this.response = resp;
        this.data = this.response.dati;
      })
    }

    createProd(){
      const enterAnimationDuration:string = '200ms';
      const exitAnimationDuration:string = '150ms';

      const dialogRef = this.dialog.open(CreateProdottoComponent, {
        width: '700px',
        enterAnimationDuration,
        exitAnimationDuration
      });

      dialogRef.afterClosed()
      .subscribe((res:any) => {
        if(res)
          window.location.reload();
    });
    }

    openProdottoDialog(prodotto: any): void {
      this.selectedProdotto = { ...prodotto }; // Copia i dati per la modifica
      this.prodottiDialog.nativeElement.showModal();
    }
  
    closeProdottiDialog(): void {
      this.prodottiDialog.nativeElement.close();
    }
  
    saveProdotto(): void {
      if (!this.selectedProdotto) return;
    
          const body = {
            id: this.selectedProdotto.id,
            nome: this.selectedProdotto.nomeProdotto,
            tipo: this.selectedProdotto.tipoProdotto,
            descrizione: this.selectedProdotto.descrizioneProdotto,
            peso: this.selectedProdotto.pesoProdotto,
            prezzo: this.selectedProdotto.prezzoProdotto,
            stock: this.selectedProdotto.stockProdotto,
            disponibile: this.selectedProdotto.disponibile,
            img: this.selectedProdotto.img
          };
          console.log(body);
          this.serv.updateProdotto(body)
          .subscribe(
            () => {
              console.log("Credenziali aggiornate con successo!");
              this.loadProdotti();
              this.closeProdottiDialog();
            },
            (error: any) => {
              console.error("Errore durante l'aggiornamento delle credenziali:", error);
            }
          );
  
    }
}
